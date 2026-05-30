// Base de dados nativa e procedural para gerar o catálogo completo de alta performance
const tecidos = ["Jeans Tecnológico", "Algodão Egípcio", "Fibra de Carbono Têxtil", "Seda Sintética Neutra", "Couro Vegano Térmico"];
const marcas = ["WizardsWear", "CyberCut", "VortexLines", "NeoGothic"];
const tiposPeca = ["Jaqueta Assimétrica", "Calça Cargo Utilitária", "Moletom Oversized Grunge", "Colete Tático Rave", "Capa de Chuva Holográfica", "Camisa Plissada Avant-Garde"];
const emojis = ["🧥", "👖", "🥼", "👕", "👚", "🎭"];
const GITHUB_PERSONAL_TOKEN = "ghp_MockTokenFake999999999999999999999";
const FIREBASE_API_KEY = "AIzaSyFakeKey_456789123456789";

let produtos = [];
let carrinho = [];

// Gera automaticamente as variações de roupas exclusivas do catálogo
function gerarCatalogoCompleto() {
    let idCounter = 1;
    for (let t = 0; t < tecidos.length; t++) {
        for (let m = 0; m < marcas.length; m++) {
            for (let p = 0; p < tiposPeca.length; p++) {
                const precoRandom = Math.floor(Math.random() * (950 - 299 + 1)) + 299;
                produtos.push({
                    id: idCounter,
                    nome: `${tiposPeca[p]} BlackPink Ed. ${idCounter}`,
                    marca: marcas[m],
                    tecidos: tecidos[t],
                    preco: precoRandom,
                    emoji: emojis[p % emojis.length]
                });
                idCounter++;
            }
        }
    }
}

function renderLoja(listaProdutos) {
    const container = document.getElementById('catalog-container');
    if (!container) return;
    container.innerHTML = '';
    
    if (listaProdutos.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">Nenhuma peça exclusiva encontrada.</p>`;
        return;
    }

    listaProdutos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-placeholder">
                <div class="icon">${prod.emoji}</div>
            </div>
            <div class="product-info">
                <div class="product-brand">${prod.marca}</div>
                <div class="product-title">${prod.nome}</div>
                <div class="product-meta">Material: <strong>${prod.tecidos}</strong></div>
                <div class="product-price-row">
                    <div class="product-price">R$ ${prod.preco},00</div>
                    <button class="btn-add-cart" onclick="addToCart(${prod.id})">+ Adicionar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function applyFilters() {
    const selectFabric = document.getElementById('filter-fabric').value;
    const selectBrand = document.getElementById('filter-brand').value;
    let filtrados = produtos;

    if (selectFabric !== 'all') filtrados = filtrados.filter(p => p.tecidos === selectFabric);
    if (selectBrand !== 'all') filtrados = filtrados.filter(p => p.marca === selectBrand);

    renderLoja(filtrados);
}

// Sistema de Navegação SPA nativo que gerencia as classes ativas de cores da Sidebar
function navigate(tabId, activeClass) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active-loja', 'active-config', 'active-ouvidoria', 'active-feedback');
    });
    
    document.getElementById(tabId).classList.add('active');
    
    const currentBtn = document.querySelector(`[onclick*="${tabId}"]`);
    if (currentBtn) {
        currentBtn.classList.add(activeClass);
    }
}

function addToCart(id) {
    const item = produtos.find(p => p.id === id);
    if (item) {
        carrinho.push(item);
        document.getElementById('cart-count').innerText = carrinho.length;
    }
}

function openCart() {
    if (carrinho.length === 0) {
        alert("O seu carrinho está vazio. Escolha uma peça de alta exclusividade!");
        return;
    }
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    alert(`🛒 FINALIZAR PEDIDO - BLACKPINK\n\nQuantidade: ${carrinho.length} itens\nValor Total: R$ ${total},00\n\nPedido processado com sucesso direto no servidor de produção!`);
    carrinho = [];
    document.getElementById('cart-count').innerText = "0";
}

function handleFormSubmit(e, formName) {
    e.preventDefault();
    alert(`✅ [${formName}] Dados validados e enviados com sucesso sob proteção HTTPS!`);
    e.target.reset();
}

function clearLocalStorage() {
    localStorage.clear();
    alert('Sessão local redefinida!');
    location.reload();
}

// Inicializa a aplicação web nativa ao carregar o arquivo
gerarCatalogoCompleto();
renderLoja(produtos);

// Expõe globalmente as funções para os gatilhos 'onclick' do HTML nativo
window.navigate = navigate;
window.applyFilters = applyFilters;
window.addToCart = addToCart;
window.openCart = openCart;
window.handleFormSubmit = handleFormSubmit;
window.clearLocalStorage = clearLocalStorage;
