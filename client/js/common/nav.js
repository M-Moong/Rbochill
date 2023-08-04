// import {} from '/js/common/index.js';
// import {getNode} from '../../lib/dom/index.js';

// window.onload = function findNavOrigin() {
// 	const navOrigin = document.querySelector('.navOrigin');
// 	const navScroll = document.querySelector('.navScroll');
// 	const navSkip = document.querySelector('#navSkip');
// 	const navSkipLink = document.querySelectorAll('.navSkipLink');
// 	const topBanner = document.querySelector('.topBanner');
// 	const topBannerButton = document.querySelector('.topBanner button');

// 	navSkipLink.forEach((node) => {
// 		node.addEventListener('focus', () => navSkip.classList.remove('sr-only'));
// 		node.addEventListener('focusout', () => navSkip.classList.add('sr-only'));
// 	});

// 	activeNavHover();

// 	topBannerButton.addEventListener('click', () => {
// 		topBanner.classList.add('hidden');
// 	});

// 	window.addEventListener('scroll', () => {
// 		changeNavigation(navOrigin, navScroll);
// 	});
// };

// // # 스크롤에 따른 네비게이션 변화 구현
// function changeNavigation(navOrigin, navScroll) {
// 	const scrollPosition = window.scrollY;
// 	const headerWrapper = getNode('.headerWrapper');
// 	const targetHeaderPosition = headerWrapper.getBoundingClientRect().bottom + window.scrollY;

// 	if (scrollPosition >= targetHeaderPosition) {
// 		navOrigin.classList.add('hidden');
// 		navScroll.classList.remove('hidden');
// 	} else {
// 		navOrigin.classList.remove('hidden');
// 		navScroll.classList.add('hidden');
// 	}
// }

// // # 카테고리 hover시 메뉴 나타남
// function activeNavHover() {
// 	const categoryButton = document.querySelector('.categoryButton');
// 	const categoryButtonHover = document.querySelector('.categoryButtonHover');
// 	const navHover = document.querySelector('.navHover');
// 	const navHoverScroll = document.querySelector('.navHoverScroll');
// 	function removeClass() {
// 		navHover.classList.remove('hidden');
// 		navHoverScroll.classList.remove('hidden');
// 	}
// 	function addClass() {
// 		navHover.classList.add('hidden');
// 		navHoverScroll.classList.add('hidden');
// 	}
// 	categoryButton.addEventListener('focus', removeClass);
// 	categoryButton.addEventListener('mouseover', removeClass);
// 	categoryButton.addEventListener('focusout', addClass);
// 	categoryButton.addEventListener('mouseout', addClass);
// 	categoryButtonHover.addEventListener('focus', removeClass);
// 	categoryButtonHover.addEventListener('mouseover', removeClass);
// 	categoryButtonHover.addEventListener('focusout', addClass);
// 	categoryButtonHover.addEventListener('mouseout', addClass);
// 	navHover.addEventListener('focus', removeClass);
// 	navHover.addEventListener('mouseover', removeClass);
// 	navHover.addEventListener('focusout', addClass);
// 	navHover.addEventListener('mouseout', addClass);
// 	navHoverScroll.addEventListener('focus', removeClass);
// 	navHoverScroll.addEventListener('mouseover', removeClass);
// 	navHoverScroll.addEventListener('focusout', addClass);
// 	navHoverScroll.addEventListener('mouseout', addClass);
// }
