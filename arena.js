// Okay, Are.na stuff!
let channelSlug = 'risograph-5nwec8aul3u' // The “slug” is just the end of the URL

// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



let renderBlock = (block) => {
	console.log(block);
  
	let blockContainer = document.querySelector("#channel-blocks");
  
	let linkItem;
  
	console.log(block.image)
  
	if (block.image) {
	  linkItem = `
		<picture>
		  <source media="(max-width: 428px)" srcset="${block.image.thumb.url}"/>
		  <source media="(max-width: 640px)" srcset="${block.image.large.url}"/>
		  <img src="${block.image.original.url}"/>
		</picture>`;
	} else {
	  linkItem = `
		<span>
		  <h3>${block.title}</h3>
		</span>`;
	}
  
	blockContainer.insertAdjacentHTML("beforeend", linkItem);
  };
  




let placeChannelInfo = (data) => {

	let title = document.querySelector('#channel-title')
	title.innerHTML=data.title
	

	let channelDescription = document.querySelector('#channel-description')
	channelDescription.innerHTML = data.channelDescription

}

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		console.log (data.title)
		console.log(data.created_art)
		data.contents.forEach(block => {
			renderBlock(block)
		});
	})