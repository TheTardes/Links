// Okay, Are.na stuff!
let channelSlug = 'risograph-5nwec8aul3u' // The “slug” is just the end of the URL

// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

let blocks = [ ]

// let renderBlock = (block) => {

// 	let blockContainer = document.querySelector("#channel-blocks");

// 	let linkItem;

// 	if (block.image) {
// 		linkItem = `
// 		<picture>
// 		  <source media="(max-width: 428px)" srcset="${block.image.thumb.url}"/>
// 		  <source media="(max-width: 640px)" srcset="${block.image.large.url}"/>
// 		  <img src="${block.image.original.url}"/>
// 		</picture>`;
// 	} else {
// 		linkItem = `
// 		<span>
// 		  <h3>${block.title}</h3>
// 		</span>`;
// 	}

// 	blockContainer.insertAdjacentHTML("beforeend", linkItem);
// };

let placeChannelInfo = (data) => {

	let title = document.querySelector('#channel-title')
	title.innerHTML = data.title

	let channelDescription = document.querySelector('#channel-description')
	channelDescription.innerHTML = data.channelDescription

}

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data

		blocks = data.contents
		// data.contents.forEach(block => {
		// 	renderBlock(block)
		// });
	})

// printing
// source https://jsfiddle.net/9FfKZ/4/

let printRandomBlock = () => {
	// get elements
	let paperHolder = document.querySelector("#paper-holder");
	let paper = document.querySelector("#paper");

	// reset printer
	paperHolder.classList.remove("print");

	// check if paper is already printed, if so add timeout for reset
	let timeout = 0;
	if (paper.innerHTML.trim()) timeout = 1000;
	setTimeout(() => {

		// get random block that has an image
		let blocksWithImage = blocks.filter((block) => block.image);
		let randomBlock = blocksWithImage[Math.floor(Math.random() * blocksWithImage.length)];

		//initiate printer
		paper.innerHTML = `<img src="${randomBlock.image.original.url}" />`;
		paper.onclick = () => {
			insertBlockintoModal(randomBlock);
		}
		paperHolder.classList.add("print");
	}, timeout);
};

// modal

  const dialog = document.querySelector("#modal");
  
  const showModal = () => {
	dialog.showModal();
  }
  
  const closeModal = () => {
	dialog.close();
  }
  
  let insertBlockintoModal = (block) => {
	showModal();
	let modalContent = document.querySelector("#modal-content");
	modalContent.innerHTML = `<div>
	<img src="${block.image.original.url}" />
	<h3 class="ok">${block.title}</h3>
	</div>`;
  }
