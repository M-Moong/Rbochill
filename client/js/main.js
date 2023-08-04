import {} from '/js/common/index.js';
import {attr, getNode, tiger} from '../lib/index.js';
import {renderDiscountProduct, renderRecommendProduct, renderRecommendRecentlyItem} from './mainPage/index.js';

const recommendList = getNode('.recommendItem');
const discountList = getNode('.discountItem');
const recentlyList = getNode('.recentlyItemRender');

// % 최근본 상품
const recentlyItemRender = getNode('.recentlyItemRender');

//  # 상품 렌더링 함수
async function renderProductList() {
	try {
		const response = await tiger.get('http://localhost:3000/products');
		const productData = response.data;
		productData.forEach((item) => renderRecommendProduct(recommendList, item));
		productData.reverse().forEach((item) => renderDiscountProduct(discountList, item));
	} catch (error) {
		console.log(error);
	}
}

//  # 최근본 상품 렌더링 함수
async function renderRecentlyList() {
	try {
		const responseRecently = await tiger.get('http://localhost:3000/users');
		const RecentlyData = responseRecently.data[0].recently;
		const responseProduct = await tiger.get('http://localhost:3000/products');
		const productData = responseProduct.data;

		for (let i = 1; i < RecentlyData.length + 1; i++) {
			const targetIndex = productData.findIndex((item) => item.id === RecentlyData[RecentlyData.length - i]);
			const renderImg = productData[targetIndex];
			renderRecommendRecentlyItem(recentlyItemRender, renderImg);
		}
	} catch (error) {
		console.log(error);
	}
}

renderProductList();
renderRecentlyList();

// # 상품 클릭시 함수
async function movePage(e) {
	e.preventDefault();

	const list = e.target.closest('li');
	const button = e.target.closest('.cartMain');

	if (button || !list) {
		return;
	}

	const productId = attr(list, 'data-id');

	localStorage.setItem('clickProduct', productId);
	console.log(productId);

	// # 클릭된 아이템 유저데이터에 추가

	const response = await tiger.get('http://localhost:3000/users');
	const users = response.data;

	const firstUser = users[users.length - users.length];
	const id = users[users.length - users.length].id;

	if (firstUser) {
		// 배열에서 중복 값을 찾기
		const index = firstUser.recently.indexOf(productId);

		if (index > -1) {
			// 기존 값이 있으면 제거
			firstUser.recently.splice(index, 1);
		}
		//
		firstUser.recently.push(productId);

		if (firstUser.recently.length > 4) {
			firstUser.recently.shift(); // 배열의 길이가 5를 초과하면 맨 앞 데이터 삭제
		}
	}

	// # data.json users 업데이트

	await tiger.delete(`http://localhost:3000/users/${id}`).then(() => {
		tiger.post('http://localhost:3000/users', firstUser);
	});
	window.location.href = `http://localhost:5500/pages/productDetail.html`;
}

recommendList.addEventListener('click', movePage);
discountList.addEventListener('click', movePage);
recentlyList.addEventListener('click', movePage);
