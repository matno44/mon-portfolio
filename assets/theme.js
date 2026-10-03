// Comportements communs des pages de comptes rendus : menu mobile, particules, filtres
(() => {
    // Année du pied de page
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

    // Menu mobile
    const navLinks = document.querySelector('.nav-links');
    const toggle = document.querySelector('.nav-toggle');
    if (navLinks && toggle) {
        toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
    }

    // Particules d'ambiance en fond de page
    const canvas = document.getElementById('ambient');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let dots = [];
        let width, height;
        let lastScroll = window.scrollY;

        const setup = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.round(Math.min(380, (width * height) / 4500));
            dots = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.08,
                vy: (Math.random() - 0.5) * 0.08 - 0.03,
                size: Math.random() < 0.85 ? 0.4 + Math.random() * 0.8 : 1.2 + Math.random() * 0.8,
                alpha: 0.14 + Math.random() * 0.4,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.0006 + Math.random() * 0.0014,
                depth: 0.2 + Math.random() * 0.8
            }));
        };

        const draw = time => {
            const scrollDelta = window.scrollY - lastScroll;
            lastScroll = window.scrollY;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#ffffff';
            for (const d of dots) {
                d.x += d.vx;
                d.y += d.vy - scrollDelta * 0.08 * d.depth;
                if (d.x < -5) d.x = width + 5;
                if (d.x > width + 5) d.x = -5;
                if (d.y < -5) d.y = height + 5;
                if (d.y > height + 5) d.y = -5;

                ctx.globalAlpha = d.alpha * (0.55 + 0.45 * Math.sin(time * d.twinkleSpeed + d.twinkle));
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        };

        const loop = time => { draw(time); requestAnimationFrame(loop); };

        setup();
        if (reduceMotion) draw(0); else requestAnimationFrame(loop);

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { setup(); if (reduceMotion) draw(0); }, 150);
        });
    }

    // Filtres par catégorie + recherche (pages de comptes rendus)
    const filters = document.getElementById('filters');
    const search = document.getElementById('search');
    const categories = [...document.querySelectorAll('.category')];
    if (filters && categories.length) {
        let active = 'all';
        const empty = document.getElementById('no-result');

        filters.innerHTML = '<button class="filter active" data-cat="all">Tout</button>' +
            categories.map(c => `<button class="filter" data-cat="${c.id}">${c.querySelector('h2').textContent}</button>`).join('');

        const apply = () => {
            const q = (search?.value || '').trim().toLowerCase();
            let visible = 0;
            categories.forEach(c => {
                let shown = 0;
                c.querySelectorAll('.doc').forEach(doc => {
                    const match = !q || doc.textContent.toLowerCase().includes(q);
                    doc.hidden = !match;
                    if (match) shown++;
                });
                c.hidden = (active !== 'all' && c.id !== active) || shown === 0;
                if (!c.hidden) visible += shown;
            });
            if (empty) empty.hidden = visible > 0;
        };

        filters.addEventListener('click', e => {
            const btn = e.target.closest('.filter');
            if (!btn) return;
            active = btn.dataset.cat;
            filters.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
            apply();
        });
        search?.addEventListener('input', apply);
    }
})();
