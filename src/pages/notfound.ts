export const NotFoundPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta property="og:title" content="Shortlink Not Found">
	<meta property="og:site_name" content="Shortlink">
	<meta property="og:description" content="Check your URL and try again later">
	<meta property="og:type" content=website>
    <title>Shortlink Not Found</title>
    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" rel="stylesheet">
</head>
<body class="h-screen flex flex-col justify-center items-center bg-gray-100 md:px-0 px-8">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md">
		<div class="p-8">
		<h1 class="text-4xl text-center mb-2 text-red-400"><i class="fa fa-link-slash"></i></h1>
        <h2 class="text-2xl font-semibold text-center mb-2">Shortlink Not Found</h2>
		<p class="text-sm mb-2 text-center">There's a lot of place where human can explore, but not this one</p>
		<p class="text-sm mb-6 text-center">Check your URL and try again</p>
		</div>
    <footer class="w-full mt-auto text-center p-4 bg-gray-200 text-gray-600">
        <p>Made with <span class="text-pink-500">&hearts;</span> by <a href="https://nerdywoffy.me">NerdyWoffy</a></p>
    </footer>
    </div>


    <!-- Tailwind JS (for optional future use) -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.7.1/dist/cdn.min.js" defer></script>
</body>
</html>
`
