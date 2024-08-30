import {
	AutoRouter,
	IRequest,
	html,
	status,
	text,
} from 'itty-router';

import {PasswordPage} from './pages/password';
import {NotFoundPage} from './pages/notfound';
import {LinkInfoPage} from './pages/linkinfo';

type CFArgs = [Env, ExecutionContext]
const router = AutoRouter<IRequest, CFArgs>();

const handleShortlinkRequest = async (request: IRequest, env: Env, context: ExecutionContext) => {
	let requestedLink = new String(request.params.id || '').trim();
	const isExpand = requestedLink.endsWith('+');

	if (requestedLink == '') {
		return html(NotFoundPage);
	}
	if (isExpand) {
		requestedLink = requestedLink.substring(0, requestedLink.length-1);
	}

	if (!/^[a-zA-Z0-9_-]+$/.exec(requestedLink)) {
		return html(NotFoundPage);
	}

	// Find destination link from KV
	const destinationLink = await (env[env.LINKS_KV_NAMESPACE] as KVNamespace).get(requestedLink);
	if (destinationLink === null) {
		return html(NotFoundPage);
	}

	// Check for password
	const destinationLinkPassword = await (env[env.LINKS_KV_NAMESPACE] as KVNamespace).get(`${requestedLink}:password`);
	if (destinationLinkPassword !== null) {
		// Return password page on non-POST
		if (request.method !== 'POST') {
			return html(PasswordPage({isInvalidPassword: false}));
		}

		// Verify password on POST
		const requestedFormData = await request.formData();
		const userPassword = requestedFormData.get('password');
		if(typeof userPassword !== 'string' || userPassword !== destinationLinkPassword) {
			// Wrong Password
			return html(PasswordPage({isInvalidPassword: true}));
		}
	}

	if (isExpand) {
		return html(LinkInfoPage({expandedLink: destinationLink}))
	}
	return status(302, {headers: {'Location': destinationLink}})
}

router.get('/robots.txt', (req, env, ctx) => text(`User-agent: *\nDisallow: /`))
router.get('/:id', handleShortlinkRequest);
router.post('/:id', handleShortlinkRequest);
router.all('*', (req, env, ctx) => status(301, {headers: {'Location': 'https://nerdywoffy.me'}}))

export default router;
