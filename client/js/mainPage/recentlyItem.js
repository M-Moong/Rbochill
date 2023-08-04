import {insertLast} from '../../lib/index.js';

// # RecommendrecentlyItem 템플릿 생성 함수
function createRecommendRecentlyItem({id = '', image = {thumbnail: ''}}) {
	const template = /* html */ `
	<li class="recently-swiper-slide" data-id='${id}'>
	<a  href='http://localhost:5500/pages/productDetail.html' class="mx-auto"><img alt="상품 이미지" src="/assets/images/product/${image.thumbnail}" /></a>
	</li>
	`;

	return template;
}

// # RecommendrecentlyItem 템플릿 랜더링 함수
export function renderRecommendRecentlyItem(target, data) {
	insertLast(target, createRecommendRecentlyItem(data));
}
