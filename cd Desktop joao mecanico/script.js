// ⚙️ CONFIGURAÇÃO - Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = "4571bb4c-2391-439f-8af8-bbea0de699b1";

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Fechar menu ao clicar em um link
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Modal de boas-vindas
window.addEventListener('load', function() {
    const modal = document.getElementById('welcomeModal');
    modal.style.display = 'flex';
    
    // Adicionar contador de visitantes
    updateVisitorCounter();
});

function closeModal() {
    const modal = document.getElementById('welcomeModal');
    modal.style.display = 'none';
}

// Contador de visitantes (simulado)
function updateVisitorCounter() {
    let visits = localStorage.getItem('visits') || 0;
    visits++;
    localStorage.setItem('visits', visits);
    console.log(`Visitante número: ${visits}`);
}

// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closeModal(); // Fecha modal se estiver aberto
        }
    });
});

// Animação dos cards de serviço ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, observerOptions);

// Observar todos os cards
document.querySelectorAll('.service-card, .testimonial-card, .brand-card').forEach(card => {
    observer.observe(card);
});

// Efeito de hover nos cards de marca com som (visual apenas)
document.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Animação nos cards de serviço
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito parallax suave no hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Mostrar/ocultar botão WhatsApp ao rolar
const whatsappButton = document.querySelector('.whatsapp-float');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        whatsappButton.style.opacity = '1';
        whatsappButton.style.visibility = 'visible';
    } else {
        whatsappButton.style.opacity = '0';
        whatsappButton.style.visibility = 'hidden';
    }
});

// Inicialmente ocultar o botão WhatsApp
whatsappButton.style.transition = 'all 0.3s ease';
whatsappButton.style.opacity = '0';
whatsappButton.style.visibility = 'hidden';

// Adicionar efeito de pulsar no botão WhatsApp
setInterval(() => {
    if (window.pageYOffset > 300) {
        whatsappButton.style.transform = 'scale(1.15)';
        setTimeout(() => {
            whatsappButton.style.transform = 'scale(1)';
        }, 200);
    }
}, 3000);

// Animação de digitação no horário de funcionamento
const hoursCard = document.querySelector('.hours-card');
if (hoursCard) {
    const hoursObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease-in-out';
            }
        });
    });
    hoursObserver.observe(hoursCard);
}

// Adicionar animação de pulso no CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);

// Envio do formulário de agendamento
document.getElementById('scheduleForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Desabilitar botão durante envio
    submitButton.disabled = true;
    submitButton.textContent = '⏳ Enviando...';
    submitButton.style.background = '#999';
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    // Formatar data para português
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('pt-BR');

    // Enviar email via Web3Forms
    try {
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('subject', `Novo Agendamento - ${service}`);
        formData.append('from_name', 'Site João Mecânico');
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('service', service);
        formData.append('date', formattedDate);
        formData.append('notes', notes || 'Nenhuma observação');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Mostrar mensagem de sucesso com animação
            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = '✅ Agendamento enviado! Você receberá um email de confirmação.';
            successMsg.style.display = 'block';
            successMsg.style.animation = 'slideIn 0.5s ease';
            
            // Resetar formulário
            this.reset();
            
            // Mensagem para WhatsApp
            const message = `Olá! Gostaria de agendar um serviço:

*Nome:* ${name}
*Telefone:* ${phone}
*Email:* ${email}
*Serviço:* ${service}
*Data Preferida:* ${formattedDate}
*Observações:* ${notes || 'Nenhuma'}`;

            const whatsappUrl = `https://wa.me/5581997045142?text=${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp após 2 segundos
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                successMsg.style.display = 'none';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.style.background = '#ff6b35';
            }, 2000);
        } else {
            throw new Error('Erro ao enviar');
        }
    } catch (error) {
        // Se o email falhar, ainda abre o WhatsApp
        console.error('Erro ao enviar email:', error);
        
        const message = `Olá! Gostaria de agendar um serviço:

*Nome:* ${name}
*Telefone:* ${phone}
*Email:* ${email}
*Serviço:* ${service}
*Data Preferida:* ${formattedDate}
*Observações:* ${notes || 'Nenhuma'}`;

        const whatsappUrl = `https://wa.me/5581997045142?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        this.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.background = '#ff6b35';
    }
});

// Definir data mínima para agendamento (hoje)
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('min', today);

// Fechar modal ao clicar fora dele
document.getElementById('welcomeModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Efeito nos links do menu ao rolar
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#ff6b35';
            link.style.fontWeight = 'bold';
        }
    });
});

// Adicionar efeito de shake nos cards de depoimento ao clicar
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.animation = 'shake 0.5s';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// Animação shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Console mensagem amigável
console.log('%c🔧 João Mecânico - Site Desenvolvido com ❤️', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cMais de 10 anos cuidando do seu veículo!', 'color: #1a1a2e; font-size: 14px;');