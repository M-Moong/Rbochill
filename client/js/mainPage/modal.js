import {attr, bindEvent, getNode, getNodes, insertLast, loadStorage, saveStorage, tiger} from '../../lib/index.js';

// # 플러스 버튼 클릭시 이벤트
// function plusInput(input) {
// 	input.value = parseInt(input.value) + 1;
// }

// # 마이너스 버튼 클릭시 이벤트
// function minusInput(input) {
// 	input.value = parseInt(input.value) - 1;
// }

// @ 노말모달창 템플릿 생성 (할인 X)
function createNormalModal({name = '', price = '', id = ''}) {
	const template = /* html */ `
			<div class="modal">
				<div id="modal" class="modal-overlay">
					<div class="modal-window">
						<p class="sr-only itemId">${id}</p>
						<dl class="modalName">
							<dt class="sr-only">상품명</dt>
							<dd>${name}</dd>
						</dl>
						<dl class="modalPrice flex">
							<dt class="sr-only">정상가격</dt>
							<dd class="text-lg font-medium">${price.toLocaleString()} 원</dd>
						</dl>
						<dl class="modalCount">
							<dt class="sr-only">상품 수량</dt>
							<dd class="cartItemCount flex rounded-sm border border-gray/100">
								<button type="button" aria-label="수량 내리기" class="modalCartCountDown text-center">–</button>
								<label for="modalCartItemCountInput" class="sr-only">상품 수량을 좌우 버튼을 통해 조정해주세요</label>
								<input type="number" id="modalCartItemCountInput" name="modalCartItemCountInput" value="1" readonly class="text-center" />
								<button type="button" aria-label="수량 올리기" class="modalCartCountUp">+</button>
							</dd>
						</dl>
						<dl class="modalTotal flex flex-col">
							<div class="flex items-center justify-between">
								<dt class="text-[1.2rem] font-medium">합계</dt>
								<dd class="text-xl font-bold clickSum">${price.toLocaleString()} 원</dd>
							</div>
							<p class="modalEvent flex text-sm"><span class="block w-10 rounded-2xl bg-[orange] text-center text-white">적립</span>로그인 후, 적립 혜택 제공</p>
						</dl>
						<button class="modalCancel rounded-default border border-gray/200 text-lg">취소</button>
						<button class="modalCart rounded-default border border-gray/200 bg-[#a03edd] text-lg text-white">장바구니 담기</button>
					</div>
				</div>
			</div>
	`;

	return template;
}

// @ 할인모달창 템플릿 생성 (할인 O)
function createDiscountModal({name = '', price = '', saleRatio = '', id = ''}) {
	const template = /* html */ `
			<div class="modal">
				<div id="modal" class="modal-overlay">
					<div class="modal-window">
						<p class="sr-only itemId">${id}</p>
						<dl class="modalName">
							<dt class="sr-only">상품명</dt>
							<dd>${name}</dd>
						</dl>
						<dl class="modalPrice flex">
						<dt class="sr-only">할인가격</dt>
						<dd class="text-lg font-medium">${Math.floor(price * (1 - saleRatio)).toLocaleString()} 원</dd>
						<dt class="sr-only">정상가격</dt>
						<dd class="font-medium cancelPrice"><s class="modalCancelPrice">${price.toLocaleString()} 원</s></dd>
						</dl>
						<dl class="modalCount">
							<dt class="sr-only">상품 수량</dt>
							<dd class="cartItemCount flex rounded-sm border border-gray/100">
								<button type="button" aria-label="수량 내리기" class="modalCartCountDown text-center">–</button>
								<label for="modalCartItemCountInput" class="sr-only">상품 수량을 좌우 버튼을 통해 조정해주세요</label>
								<input type="number" id="modalCartItemCountInput" name="modalCartItemCountInput" value="1" readonly class="text-center" />
								<button type="button" aria-label="수량 올리기" class="modalCartCountUp">+</button>
							</dd>
						</dl>
						<dl class="modalTotal flex flex-col">
							<div class="flex items-center justify-between">
								<dt class="text-[1.2rem] font-medium">합계</dt>
								<dd class="text-xl font-bold clickSum">${Math.floor(price * (1 - saleRatio)).toLocaleString()} 원</dd>
							</div>
							<p class="modalEvent flex text-sm"><span class="block w-10 rounded-2xl bg-[orange] text-center text-white">적립</span>로그인 후, 적립 혜택 제공</p>
						</dl>
						<button class="modalCancel rounded-default border border-gray/200 text-lg">취소</button>
						<button class="modalCart rounded-default border border-gray/200 bg-[#a03edd] text-lg text-white">장바구니 담기</button>
					</div>
				</div>
			</div>
	`;

	return template;
}

// * 노말모달창 렌더링 함수 (할인 X)
function renderNormalModal(target, data) {
	insertLast(target, createNormalModal(data));
}
// * 할인모달창 렌더링 함수 (할인 O)
function renderDiscountModal(target, data) {
	insertLast(target, createDiscountModal(data));
}

// ! 노드에 따른 템플릿 나누기
function divideNode(target, data) {
	const modal = getNode('.modalWrapper');
	if (target.closest('.recommendItem')) {
		return renderNormalModal(modal, data);
	}
	if (target.closest('.discountItem')) {
		return renderDiscountModal(modal, data);
	}
}

// ^ 모달창 취소하기
function cancelModal() {
	const reset = getNode('.modal');
	if (reset) {
		reset.remove();
		document.body.style.overflowY = 'auto';
		document.body.style.overflowX = 'auto';
	}
}

// ^ 모달창 바깥 영역으로 취소하기
function outsideCancelModal(e) {
	e.preventDefault();

	const target = e.target;

	if (target.classList.contains('modal-overlay')) {
		if (!target) {
			return;
		}

		const reset = getNode('.modal');
		if (reset) {
			reset.remove();
			document.body.style.overflowY = 'auto';
			document.body.style.overflowX = 'auto';
		}
	}
}

// ^ 모달창 스크롤 막기
function noScroll() {
	document.body.style.overflowY = 'hidden';
	document.body.style.overflowX = 'hidden';
}

// % 모달창 tabIndex 잡기
const focusFirstElement = () => {
	const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	const firstFocusable = focusableElements[0];
	firstFocusable.focus();
};

// % 모달창안에서 tabIndex가 나가지 않도록 하기
const trapFocus = (e) => {
	const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	const firstFocusable = focusableElements[0];
	const lastFocusable = focusableElements[focusableElements.length - 1];

	if (e.key === 'Tab') {
		if (e.shiftKey) {
			if (document.activeElement === firstFocusable) {
				e.preventDefault();
				lastFocusable.focus();
			}
		} else {
			if (document.activeElement === lastFocusable) {
				e.preventDefault();
				firstFocusable.focus();
			}
		}
	}
};

// # 선택된 상품과 수량 로컬스토리지에 저장하기
function saveItem() {
	const itemId = getNode('.itemId');
	let quantityInput = getNode('#modalCartItemCountInput');

	const selectId = itemId.innerHTML; // id
	let selectValue = parseInt(quantityInput.value); // quantity
	let selectItem = {
		[selectId]: selectValue,
	};

	let localItem = JSON.parse(localStorage.getItem('cart')); // 1. 2.

	if (!localItem) {
		const dd = {...selectItem};
		saveStorage('cart', dd);
		cancelModal();

		return;
	} else {
		const hasKey = selectId in localItem;

		if (hasKey) {
			localItem[selectId] += selectValue;
			saveStorage('cart', localItem);
			cancelModal();
		} else {
			const d = {...localItem, ...selectItem};
			saveStorage('cart', d);
			cancelModal();
		}
	}
}

function countValue(node, value, input) {
	let firstValue = +value;

	if (hasClassName(node, 'modalCartCountUp')) {
		firstValue++;
	} else if (hasClassName(node, 'modalCartCountDown') && firstValue > 0) {
		firstValue--;
	}
	input.value = firstValue;

	return firstValue;
}

const hasClassName = (node, name) => node.classList.contains(name);
const findButton = (target) => target.closest('button');

// # normal모달창 생성
async function openNormalModal(e) {
	e.preventDefault();

	try {
		const button = e.target.closest('.cartMain');
		const li = e.target.closest('li');

		if (!button) {
			return;
		}

		const id = attr(li, 'data-id');
		const response = await tiger.get(`http://localhost:3000/products/${id}`);
		const productData = response.data;

		renderNormalModal(modal, productData);

		const minusBtn = getNode('.modalCartCountDown');
		const plusBtn = getNode('.modalCartCountUp');
		let quantityInput = getNode('#modalCartItemCountInput');
		// let value = quantityInput.value;
		document.body.style.overflowY = 'hidden';
		document.body.style.overflowX = 'hidden';
		focusFirstElement();
		modal.addEventListener('keydown', trapFocus);

		// modal.addEventListener('click', countValue(countClick, value, quantityInput));
		// const countClick = e.target.closest('button');
		// plusBtn.addEventListener('click', countValue());

		minusBtn.addEventListener('click', () => {
			// & 값 변경시 합계 다시 렌더
			quantityInput.value = parseInt(quantityInput.value) - 1;
			// renderNormalModal(modal, productData);
			// createAgainNormalModal(modal, productData);
			let abcd = productData.price * quantityInput.value;
			const clickSum = getNode('.clickSum');
			clickSum.innerText = abcd.toLocaleString() + '원';
		});

		plusBtn.addEventListener('click', () => {
			// & 값 변경시 합계 다시 렌더
			quantityInput.value = parseInt(quantityInput.value) + 1;
			let abcd = productData.price * quantityInput.value;
			const clickSum = getNode('.clickSum');
			clickSum.innerText = abcd.toLocaleString() + '원';
		});

		// 아이디와 수량을 로컬 스토리지에 값 넣어주기
		// 1. 아이디는 어디서 구해올것인가
		// 2. 수량은 어떻게 구해올것인가
		// const itemId = getNode('.itemId');
		// quantityInput;

		// let selectId = itemId.innerHTML; // id
		// let selectValue = parseInt(quantityInput.value); // quantity
		// let selectItem = {
		// 	[selectId]: selectValue,
		// };

		// // 		객체화 -> 키값 ->
		// // 키값으로 값 변경
		// // 로컬에 넣는다.

		// (function test() {
		// 	let localItem = JSON.parse(localStorage.getItem('cart')); // 1. 2.

		// 	const hasKey = selectId in localItem;

		// 	if (hasKey) {
		// 		localItem[selectId] += selectValue;
		// 		saveStorage('cart', localItem);
		// 	} else {
		// 		const d = {...localItem, ...selectItem};
		// 		saveStorage('cart', d);
		// 	}
		// })();
		const putCart = getNode('.modalCart');
		putCart.addEventListener('click', saveItem);

		const cancel = getNode('.modalCancel');
		const outside = getNode('.modal-overlay');
		cancel.addEventListener('click', cancelModal);
		outside.addEventListener('click', outsideCancelModal);
	} catch (error) {
		console.log(error);
	}
}

// # discount모달창 생성
async function openDiscountModal(e) {
	e.preventDefault();
	try {
		const button = e.target.closest('.cartMain');
		const li = e.target.closest('li');

		if (!button) {
			return;
		}

		const id = attr(li, 'data-id');
		const response = await tiger.get(`http://localhost:3000/products/${id}`);
		const productData = response.data;
		renderDiscountModal(modal, productData);
		const minusBtn = getNode('.modalCartCountDown');
		const plusBtn = getNode('.modalCartCountUp');
		const quantityInput = getNode('#modalCartItemCountInput');
		document.body.style.overflowY = 'hidden';
		document.body.style.overflowX = 'hidden';
		focusFirstElement();
		modal.addEventListener('keydown', trapFocus);

		let discount = 1 - productData.saleRatio;
		minusBtn.addEventListener('click', () => {
			quantityInput.value = parseInt(quantityInput.value) - 1;
			// renderNormalModal(modal, productData);
			// createAgainNormalModal(modal, productData);
			let abcd = productData.price * quantityInput.value * discount;
			const clickSum = getNode('.clickSum');
			clickSum.innerText = abcd.toLocaleString() + '원';
		});

		plusBtn.addEventListener('click', () => {
			quantityInput.value = parseInt(quantityInput.value) + 1;
			let abcd = productData.price * quantityInput.value * discount;

			const clickSum = getNode('.clickSum');
			clickSum.innerText = abcd.toLocaleString() + '원';
		});

		const putCart = getNode('.modalCart');
		putCart.addEventListener('click', saveItem);

		const cancel = getNode('.modalCancel');
		const outside = getNode('.modal-overlay');
		cancel.addEventListener('click', cancelModal);
		outside.addEventListener('click', outsideCancelModal);
	} catch (error) {
		console.log(error);
	}
}

// # 모달창 열기
async function openModal(e) {
	try {
		e.preventDefault();

		const button = e.target.closest('.cartMain'); // 장바구니 담기 버튼
		const li = e.target.closest('li'); // 상품리스트

		if (!button) {
			return;
		}

		const id = attr(li, 'data-id'); // li에 설정해놓은 data-id를 가져온다
		const response = await tiger.get(`http://localhost:3000/products/${id}`); // 나의 로컬 서버에서 데이터를 가져온다
		const productData = response.data; // 서버에서 가져온 데이터를 담는다

		divideNode(e.target, productData); // 렌더링해줄 템플릿 나누기

		noScroll(); // 모달창 스크롤 막기

		const cancel = getNode('.modalCancel'); // 취소 버튼

		bindEvent(cancel, 'click', cancelModal); // 취소버튼을 눌렀을때 모달창 닫기

		const outside = getNode('.modal-overlay'); // 모달창 바깥영역

		bindEvent(outside, 'click', outsideCancelModal); // 바깥영역 클릭시 모달창 닫기
	} catch (err) {
		console.log(err);
	}
}

// & 모달창 이벤트
(function () {
	const list = getNodes('.mainItem');

	list.forEach((item) => {
		item.addEventListener('click', openModal);
	});
})();
