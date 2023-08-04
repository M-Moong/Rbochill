import {insertLast} from '../../lib/index.js';

// # recommendProduct 템플릿 생성 함수
function createRecommendProduct({id = '', name = '', price = '', image = ''}) {
	const template = /* html */ `
	<li class='swiper-slide' data-id='${id}'>
		<a href="http://localhost:5500/pages/productDetail.html">
			<figure class="relative">
				<img src='/assets/images/product/${image.thumbnail}' alt="${image.alt}" class="pb-4" />
				<img src="/assets/images/main/ic-add-cart.svg" alt="장바구니에 상품 추가" class="absolute bottom-[33px] right-[15px] cartMain" tabindex='0' />
			</figure>
			<dl>
				<dt class="sr-only">상품명</dt>
				<dd class="itemName mb-2">${name}</dd>
				<dt class="sr-only">가격</dt>
				<dd class="itemPrice">${price.toLocaleString()} 원</dd>
			</dl>
		</a>
		</li>
	`;

	return template;
}

// # recommendProduct 템플릿 랜더링 함수
export function renderRecommendProduct(target, data) {
	insertLast(target, createRecommendProduct(data));
}

/* -------------------------------------------------------------------------- */

// # DiscountProduct 템플릿 생성 함수
function createDiscountProduct({id = '', name = '', price = '', image = '', saleRatio = ''}) {
	const template = /* html */ `
		<li class="swiper-slide" data-id='${id}'>
			<a href="http://localhost:5500/pages/productDetail.html">
				<figure class="relative">
					<img src='/assets/images/product/${image.thumbnail}' alt="${image.alt}" class="pb-4" /><img
						src="/assets/images/main/ic-add-cart.svg"
						alt="장바구니에 상품 추가"
						class="absolute bottom-[33px] right-[15px] cartMain" tabindex='0'/>
				</figure>
				<dl class="relative">
					<dt class="sr-only">상품명</dt>
					<dd class="itemName">${name}</dd>
					<dt class="sr-only">정상가격</dt>
					<dd class="absolute -bottom-6 cancelPrice"><s>${price.toLocaleString()} 원</s></dd>
					<dt class="sr-only">할인율</dt>
					<dd class="text-accent/yellow inline text-lg">${saleRatio * 100}%</dd>
					<dt class="sr-only">할인가격</dt>
					<dd class="text-lg ml-2 inline itemPrice">${Math.floor(price * (1 - saleRatio)).toLocaleString()} 원</dd>
				</dl>
			</a>
		</li>
	`;

	return template;
}

// # DiscountProduct 템플릿 랜더링 함수
export function renderDiscountProduct(target, data) {
	insertLast(target, createDiscountProduct(data));
}
