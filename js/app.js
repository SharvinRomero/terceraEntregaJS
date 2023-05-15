window.addEventListener('load', function () {
	//aquí va todo el código que debe esperar a cargar el HTML dentro
	//Mostrar Clave
	const muestraClave = document.getElementById('verClave');
	const ocultarClave = document.getElementById('password');

	muestraClave.addEventListener('click', function () {
		if (ocultarClave.type === 'password') {
			ocultarClave.type = 'text';
			muestraClave.innerHTML = '<i class="bi bi-eye-slash"></i>';
		} else {
			ocultarClave.type = 'password';
			muestraClave.innerHTML = '<i class="bi bi-eye"></i>';
		}
	});

	/*Evaluador de condición para email */
	const form = document.querySelector('form');
	const email = document.getElementById('email');

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		if (!email.checkValidity()) {
			email.classList.add('is-invalid');
		} else {
			email.classList.remove('is-invalid');
		}
	});
});

/*Función para logeo */
function logForm() {
	let user = document.getElementById("email").value;
	let pass = document.getElementById("password").value;
	if (user == "javier@cohesion.com" && pass == "0123456789") {
		window.location = "home.html";
	}
	else {
		swal("Datos incorrectos", "pruebe con: \n\n javier@cohesion.com \n\n 0123456789", "warning");
	}
}


/*Algoritmo carrito de compras*/
window.addEventListener('load', function () {

	/*Variable constantes globales para el contenedor del carrito*/
	const btnCart = document.querySelector('.container-cart-icon');
	const containerCartProducts = document.querySelector('.container-cart-products');

	btnCart.addEventListener('click', () => {
		containerCartProducts.classList.toggle('d-none');
	});

	/*Variable constantes globales para los producto dentro del carrito*/
	const cartInfo = document.querySelector('.cart-product');
	const rowProduct = document.querySelector('.row-product');

	/* Lista de todos los contenedores de productos*/
	const productsList = document.querySelector('.container-items');

	/* Variable de arreglos de Productos */
	let allProducts = [];

	const valorTotal = document.querySelector('.total-pagar');

	const countProducts = document.querySelector('#contador-productos');

	const cartEmpty = document.querySelector('.cart-empty');
	const cartTotal = document.querySelector('.cart-total');

	productsList.addEventListener('click', e => {
		if (e.target.classList.contains('btn-add-cart')) {
			const product = e.target.parentElement;

			const infoProduct = {
				quantity: 1,
				title: product.querySelector('h5').textContent,
				price: product.querySelector('p').textContent,
			};

			const exits = allProducts.some(
				product => product.title === infoProduct.title
			);

			if (exits) {
				const products = allProducts.map(product => {
					if (product.title === infoProduct.title) {
						product.quantity++;
						return product;
					} else {
						return product;
					}
				});
				allProducts = [...products];
			} else {
				allProducts = [...allProducts, infoProduct];
			}

			showHTML();
		}
	});

	rowProduct.addEventListener('click', e => {
		if (e.target.classList.contains('icon-close')) {
			const product = e.target.parentElement;
			const title = product.querySelector('p').textContent;

			allProducts = allProducts.filter(
				product => product.title !== title
			);

			console.log(allProducts);

			showHTML();
		}
	});

	/* Funcion para mostrar  HTML */
	const showHTML = () => {
		if (!allProducts.length) {
			cartEmpty.classList.remove('d-none');
			rowProduct.classList.add('d-none');
			cartTotal.classList.add('d-none');
		} else {
			cartEmpty.classList.add('d-none');
			rowProduct.classList.remove('d-none');
			cartTotal.classList.remove('d-none');
		}

		/* Restaurar HTML */
		rowProduct.innerHTML = '';

		let total = 0;
		let totalOfProducts = 0;

		allProducts.forEach(product => {
			const containerProduct = document.createElement('div');
			containerProduct.classList.add('cart-product');

			containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="fs-6">${product.quantity}</span>
				<span><img></span>
                <p class="fs-6 my-2">${product.title}</p>
                <span class="fs-6">${product.price}</span>
            </div>
            <i class="bi bi-trash3 icon-close text-danger"></i>
        `;

			rowProduct.append(containerProduct);

			total =
				total + parseInt(product.quantity * product.price.slice(1));
			totalOfProducts = totalOfProducts + product.quantity;
		});

		valorTotal.innerText = `$${total}`;
		countProducts.innerText = totalOfProducts;

		const botonClick = document.getElementById('finishBuy');
		botonClick.addEventListener('click', function () {
			// Guardar la información del carrito en el almacenamiento local del navegador
			localStorage.setItem('carrito', JSON.stringify(allProducts));
			window.location.href = 'finishBuy.html';
		});

	};

});

/*Algoritmo para elementos en la memoria*/
window.addEventListener('load', function () {
	// Obtener la información del carrito del almacenamiento local del navegador
	const carrito = JSON.parse(localStorage.getItem('carrito'));

	// Mostrar la información del carrito en el HTML
	const contenedorProductos = document.querySelector('.container-productos');
	let total = 0;

	carrito.forEach(producto => {
		const contenedorProducto = document.createElement('div');
		contenedorProducto.classList.add('producto');

		contenedorProducto.innerHTML = `
<img src="${producto.imagen}" alt="${producto.title}" class="imagen-producto d-none">
<div class="informacion-producto">
  <h2 class="fs-5">${producto.title}</h2>
  <p class="fs-6">Precio: ${producto.price}</p>
</div>
`;

		contenedorProductos.appendChild(contenedorProducto);

		total += parseInt(producto.price.slice(1)) * producto.quantity;
	});

	const contenedorTotal = document.querySelector('.total');
	contenedorTotal.innerHTML = `
<h3>Total: $${total}</h3>
`
/*Calculo de coutas*/
	const contenidoTotal = document.getElementById('totales')
	contenidoTotal.innerHTML = `<p>${total}</p>`
		;

	const totalElement = document.querySelector('#totales')
	const valorTotal = parseFloat(totalElement.textContent);
	const numCuotas = 3;


	const valorCuota = valorTotal / numCuotas;

	const tasaInteres = 0.05; // Tasa de interés del 5%
	const valorInteres = valorTotal * tasaInteres;
	const valorCuotaConInteres = (valorTotal + valorInteres) / numCuotas;

	// Mostrar el valor de cada cuota en la página web
	const selectCuotas = document.getElementById('dues'); // Elemento select en la página web
	const cuotas = [1, 2, 3]; // Opciones de cuotas disponibles en el select
	for (let i = 0; i < cuotas.length; i++) {
		const cuota = cuotas[i];
		const option = document.createElement('option');
		option.value = cuota;
		option.text = `${cuota} cuotas de `;
		if (cuota === 1) {
			option.text += ` $${valorTotal.toFixed(2)}`;
		} else {
			option.text += ` $${valorCuotaConInteres.toFixed(2)} total final(${(valorCuotaConInteres * cuota).toFixed(2)})`;
		}
		selectCuotas.appendChild(option);
	}

});

//Funcion para el primer producto
window.addEventListener('load', function () {
	function mainList(newProducts) {
		// Obtener el elemento contenedor para las tarjetas
		const contenedorNewProducts = document.getElementById('primerProducto')

		newProducts.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

		// Recorrer cada objeto en el array ordenado y crear una tarjeta para cada uno
		newProducts.forEach(obj => {
			// Crear la estructura HTML de la tarjeta
			const cardsProducts = `<div class="col" id=${obj.id}">
	<div class="card rounded-0 border-0">
		<img src="${obj.imagen}"
			class="card-img-top rounded-3 mirror cover-big" alt="${obj.descripcion}">
		<div class="card-body info-product row">
			<h5 class="card-title">${obj.nombre}</h5>
			<p class="card-text fs-6 m-0 price">$${obj.precio}</p>
			<button class="btn btn-dark rounded-pill btn-add-cart fs-7 mt-3">
				<i class="bi bi-cart3 mx-1 btn-add-cart"></i>Añadir
			</button>
		</div>
	</div>
</div>`;

			// Agregar la tarjeta al contenedor
			contenedorNewProducts.innerHTML += cardsProducts;
		});
	}

	const listProducts = [
		//Silla Nexus
		{
			"id": "sillaNexus",
			"imagen": "./img/chairs/chair-nexus-perspective.jpg",
			"descripcion": "Silla Nexus compuesta con estructura de madera chapada y cogines con espuma de alta densidad recubierto por lona de color beige",
			"nombre": "Silla Nexus",
			"precio": "75",
			"fecha": "04/12/2023",
		},
	]

	mainList(listProducts)
});

//Funcion para los productos destacados
window.addEventListener('load', function () {
	let productosDestacados = document.querySelector("#productosDestacados");

	fetch("./js/productosDestacados.json")
		.then((resp) => resp.json())
		.then((data) => {
			data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
			data.map((item) => {
				const content = document.createElement("div");
				content.innerHTML = `
			<div class="col" id=${item.id}">
		<div class="card rounded-0 border-0">
			<img src="${item.imagen}"
				class="card-img-top rounded-3 cover-min" alt="${item.descripcion}">
			<div class="card-body info-product row">
				<h5 class="card-title">${item.nombre}</h5>
				<p class="card-text fs-6 m-0 price">$${item.precio}</p>
				<button class="btn btn-dark rounded-pill btn-add-cart fs-7 mt-2">
					<i class="bi bi-cart3 mx-1 btn-add-cart"></i>Añadir
				</button>
			</div>
		</div>
	</div>
	`;
				productosDestacados.append(content);
			});
		});

});

//Funcion para los productos
window.addEventListener('load', function () {
	let elementosProductos2 = document.getElementById("productos");

	fetch("./js/productos.json")
		.then((resp) => resp.json())
		.then((data) => {

			data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
			data.map((item) => {
				const content = document.createElement("div");
				content.innerHTML = `
				<div class="col" id=${item.id}">
			<div class="card rounded-0 border-0">
				<img src="${item.imagen}"
					class="card-img-top rounded-3 cover-med" alt="${item.descripcion}">
				<div class="card-body info-product row">
					<h5 class="card-title">${item.nombre}</h5>
					<p class="card-text fs-6 m-0 price">$${item.precio}</p>
					<button class="btn btn-dark rounded-pill btn-add-cart fs-7 mt-2">
						<i class="bi bi-cart3 mx-1 btn-add-cart"></i>Añadir
					</button>
				</div>
			</div>
		</div>
		`;
				elementosProductos2.append(content);
			});
		});

});



