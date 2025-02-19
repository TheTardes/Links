// Okay, Are.na stuff!
let channelSlug = 'risograph-5nwec8aul3u' // The “slug” is just the end of the URL

// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

let blocks = []

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

		console.log(blocks)
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

		// let randomBlock = blocks[3];
		let randomBlock = blocks[Math.floor(Math.random() * blocks.length)];

		if (randomBlock.image) {
			paper.innerHTML = `<img src="${randomBlock.image.original.url}" />`;
		}

		else {
			paper.innerHTML = `<div class="text-block"><p>Read:</p><h3>${randomBlock.title}</h3></div>`
		}
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
	if (block.class === "Media") {
		modalContent.innerHTML = `<div class="modal-video"><h3>${block.title}</h3> ${block.embed.html}	<p id="modal-text"> ${block.description || ""} </p> <a class= "button"> view on arena <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="none">
						<g clip-path="url(#clip0_82_41092)">
							<path d="M32.5 23.0002C54.9525 26.9752 56.7376 24.1277 79.4001 25.5977M69.0826 42.0077C75.4851 33.1027 86.2576 32.2277 93.9326 25.0702C86.5476 21.9752 71.8601 15.0127 67.1951 7.99268" stroke="black" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
						</g>
						<defs>
							<clipPath id="clip0_82_41092">
								<rect width="50" height="100" fill="white" transform="matrix(0 1 -1 0 100 0)" />
							</clipPath>
						</defs>
					</svg> </a>
	</div>`;
	}

	else if (block.class === "Text") {
		modalContent.innerHTML = `<div class="modal-image">  <h3>${block.title}</h3> <p id="modal-p">${block.content}</p>
			
			</p><a class="button"> view original <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="none">
				<g clip-path="url(#clip0_82_41092)">
					<path d="M32.5 23.0002C54.9525 26.9752 56.7376 24.1277 79.4001 25.5977M69.0826 42.0077C75.4851 33.1027 86.2576 32.2277 93.9326 25.0702C86.5476 21.9752 71.8601 15.0127 67.1951 7.99268" stroke="black" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				</g>
				<defs>
					<clipPath id="clip0_82_41092">
						<rect width="50" height="100" fill="white" transform="matrix(0 1 -1 0 100 0)" />
					</clipPath>
				</defs>
			</svg> </a>
		</div>`;
	}

	else if (block.class === "Link") {
		modalContent.innerHTML = `<div class="modal-image">  <h3>${block.title}</h3>
			<p id="modal-text"> ${block.description || ""}
	</p><img src="${block.image.original.url}" />
			</p><a class="button"> go to website <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="none">
				<g clip-path="url(#clip0_82_41092)">
					<path d="M32.5 23.0002C54.9525 26.9752 56.7376 24.1277 79.4001 25.5977M69.0826 42.0077C75.4851 33.1027 86.2576 32.2277 93.9326 25.0702C86.5476 21.9752 71.8601 15.0127 67.1951 7.99268" stroke="black" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				</g>
				<defs>
					<clipPath id="clip0_82_41092">
						<rect width="50" height="100" fill="white" transform="matrix(0 1 -1 0 100 0)" />
					</clipPath>
				</defs>
			</svg> </a>
		</div>`;
	}

	else if (block.class === "Attachment") {
		modalContent.innerHTML = `<div class="modal-image">  <h3>${block.title}</h3>
			<p id="modal-text"> ${block.description || ""}
	</p><img src="${block.image.original.url}" />
			</p><a class="button"> see full pdf <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="none">
				<g clip-path="url(#clip0_82_41092)">
					<path d="M32.5 23.0002C54.9525 26.9752 56.7376 24.1277 79.4001 25.5977M69.0826 42.0077C75.4851 33.1027 86.2576 32.2277 93.9326 25.0702C86.5476 21.9752 71.8601 15.0127 67.1951 7.99268" stroke="black" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				</g>
				<defs>
					<clipPath id="clip0_82_41092">
						<rect width="50" height="100" fill="white" transform="matrix(0 1 -1 0 100 0)" />
					</clipPath>
				</defs>
			</svg> </a>
		</div>`;
	}

	else {
		modalContent.innerHTML = `<div class="modal-image" >  <h3>${block.title}</h3><img src="${block.image.original.url}" />
	 <p id="modal-text"> ${block.description || ""}
	</p><a class= "button"> view original <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="none">
						<g clip-path="url(#clip0_82_41092)">
							<path d="M32.5 23.0002C54.9525 26.9752 56.7376 24.1277 79.4001 25.5977M69.0826 42.0077C75.4851 33.1027 86.2576 32.2277 93.9326 25.0702C86.5476 21.9752 71.8601 15.0127 67.1951 7.99268" stroke="black" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
						</g>
						<defs>
							<clipPath id="clip0_82_41092">
								<rect width="50" height="100" fill="white" transform="matrix(0 1 -1 0 100 0)" />
							</clipPath>
						</defs>
					</svg> </a>
	</div> `;
	}
}
