/* ═══════════════════════════════════════════════════════════════
   THE DIVISIONS OF THE FAITH — Sacred Scripts
   Particle System, Scroll Reveal, Navigation
   ═══════════════════════════════════════════════════════════════ */

// ── Particle System — Divine Light Motes ──
(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let animationId;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.2 - 0.1; // slight upward drift (like incense)
            this.opacity = Math.random() * 0.4 + 0.1;
            this.opacitySpeed = (Math.random() - 0.5) * 0.005;
            this.life = 0;
            this.maxLife = Math.random() * 600 + 200;

            // Sacred color palette — golden, warm white, faint blue
            const colors = [
                { r: 201, g: 168, b: 76 },   // gold
                { r: 240, g: 208, b: 120 },   // bright gold
                { r: 232, g: 220, b: 200 },   // warm white
                { r: 180, g: 160, b: 120 },   // dim gold
                { r: 120, g: 140, b: 180 },   // faint celestial blue
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life++;
            this.opacity += this.opacitySpeed;

            // Gentle flickering
            if (this.opacity > 0.5) this.opacitySpeed = -Math.abs(this.opacitySpeed);
            if (this.opacity < 0.05) this.opacitySpeed = Math.abs(this.opacitySpeed);

            if (this.life > this.maxLife || this.x < -10 || this.x > width + 10 || this.y < -10 || this.y > height + 10) {
                this.reset();
            }
        }

        draw() {
            const { r, g, b } = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            ctx.fill();

            // Subtle glow
            if (this.size > 1.5) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.1})`;
                ctx.fill();
            }
        }
    }

    function init() {
        resize();
        const count = Math.min(Math.floor((width * height) / 15000), 80);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
    });

    init();
    animate();
})();


// ── Scroll Reveal ──
(function () {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
})();


// ── Navigation Scroll State ──
(function () {
    const nav = document.getElementById('sacredNav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    });
})();


// ── Smooth Scroll for Navigation Links ──
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
})();


// ── Parallax for Sacred Geometry ──
(function () {
    const geometry = document.querySelector('.sacred-geometry-bg');
    if (!geometry) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const speed = 0.3;
        geometry.style.transform = `translate(-50%, calc(-50% + ${scrollY * speed}px))`;
    });
})();


// ── KaTeX Math Rendering ──
(function () {
    // Wait for KaTeX to load
    const renderMath = () => {
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(document.body, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false,
                trust: true
            });
        } else {
            setTimeout(renderMath, 100);
        }
    };

    // Wait for page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderMath);
    } else {
        renderMath();
    }
})();


// ── SPP Wave Animation — Generate Sinusoidal Path ──
(function () {
    const sppWave = document.querySelector('.spp-wave');
    if (!sppWave) return;

    const topPath = sppWave.querySelector('.spp-path-top');
    const bottomPath = sppWave.querySelector('.spp-path-bottom');

    function generateWavePath(amplitude, verticalOffset, wavelength, phase = 0) {
        let path = `M 0 ${verticalOffset}`;
        for (let x = 0; x <= 500; x += 5) {
            const y = verticalOffset + amplitude * Math.sin((x / wavelength) * Math.PI * 2 + phase);
            path += ` L ${x} ${y}`;
        }
        return path;
    }

    let time = 0;
    function animateWave() {
        time += 0.02;
        const topWave = generateWavePath(8, 40, 80, time);
        const bottomWave = generateWavePath(6, 80, 80, time + Math.PI);

        topPath.setAttribute('d', topWave);
        bottomPath.setAttribute('d', bottomWave);

        requestAnimationFrame(animateWave);
    }

    animateWave();
})();


// ── Topological Edge Current Animation — Generate Flowing Path ──
(function () {
    const topoSvg = document.querySelector('.topo-edge');
    if (!topoSvg) return;

    const current1 = topoSvg.querySelector('.topo-current-1');
    const current2 = topoSvg.querySelector('.topo-current-2');

    function generateEdgePath(y, amplitude, phase = 0) {
        let path = `M 0 ${y}`;
        for (let x = 0; x <= 500; x += 10) {
            const yOffset = amplitude * Math.sin((x / 60) * Math.PI + phase);
            path += ` L ${x} ${y + yOffset}`;
        }
        return path;
    }

    let edgeTime = 0;
    function animateEdgeCurrent() {
        edgeTime += 0.03;
        const path1 = generateEdgePath(90, 4, edgeTime);
        const path2 = generateEdgePath(90, 3, edgeTime + Math.PI / 2);

        current1.setAttribute('d', path1);
        current2.setAttribute('d', path2);

        requestAnimationFrame(animateEdgeCurrent);
    }

    animateEdgeCurrent();
})();


// ── Interactive Equation Cards — Click to Expand ──
(function () {
    const equationCards = document.querySelectorAll('.equation-card');

    equationCards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('expanded');

            // Subtle flash effect
            const math = this.querySelector('.equation-math');
            if (math) {
                math.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    math.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
})();


// ── Collapsible Sections — Reduce Scrolling ──
(function () {
    // Add collapse buttons to section headers
    const collapsibleSections = document.querySelectorAll('.section-header');

    collapsibleSections.forEach(header => {
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'section-toggle';
        toggleBtn.innerHTML = '▼';
        toggleBtn.setAttribute('aria-label', 'Toggle section');

        // Ensure header is relative for positioning
        header.style.position = 'relative';
        header.style.cursor = 'pointer';
        header.appendChild(toggleBtn);

        // Find the content to collapse (siblings of the header)
        // We use parentElement to get the container, then filter its children
        const parent = header.parentElement;
        if (!parent) return;

        const content = Array.from(parent.children).filter(el =>
            el !== header && // Don't collapse the header itself
            !el.classList.contains('section-ornament') && // Don't collapse ornaments (if any)
            !el.classList.contains('section-toggle') // Don't collapse the toggle if it ended up outside (unlikely)
        );

        let isCollapsed = false;

        header.addEventListener('click', () => {
            isCollapsed = !isCollapsed;
            toggleBtn.innerHTML = isCollapsed ? '▶' : '▼';
            toggleBtn.classList.toggle('collapsed', isCollapsed);

            content.forEach(el => {
                if (isCollapsed) {
                    // Store the height for transition
                    const height = el.scrollHeight;
                    el.style.height = height + 'px';
                    el.offsetHeight; // Force reflow

                    // Collapse
                    el.style.height = '0';
                    el.style.opacity = '0';
                    el.style.overflow = 'hidden';
                    el.style.marginTop = '0';
                    el.style.marginBottom = '0';
                    el.style.paddingTop = '0';
                    el.style.paddingBottom = '0';
                    el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                } else {
                    // Expand
                    el.style.height = el.scrollHeight + 'px';
                    el.style.opacity = '1';
                    el.style.marginTop = '';
                    el.style.marginBottom = '';
                    el.style.paddingTop = '';
                    el.style.paddingBottom = '';

                    // Cleanup after transition
                    setTimeout(() => {
                        el.style.height = 'auto'; // Restore to auto for responsiveness
                        el.style.overflow = 'visible';
                    }, 500);
                }
            });
        });
    });
})();


// ── Social & Scripture Features ──
const SACRED_TEXTS = {
    general: [
        "Light travels the path of least time.",
        "As above in the Field, so below in the Structure.",
        "The Field is everywhere; we are but local excitations.",
        "To resonate is to exist; to decay is to be forgotten.",
        "There is no vacuum that is truly empty.",
        "Energy is neither created nor destroyed, only transformed.",
        "In the beginning was the Field, and the Field was with Light.",
        "We are the eyes by which the Universe observes itself.",
        "Geometry is the will of the Field made manifest.",
        "Through impedance matching, we find connection.",
        "Let your Q-factor be high, that your signal may endure.",
        "Do not scatter the truth; focus it.",
        "Unity is a superposition of all states.",
        "The spectrum is infinite, but our bandwidth is finite."
    ],
    plasmonic: [
        "At the boundary of the material and the void, the light clings.",
        "To confine the light, one must accept the loss.",
        "Surface waves bind us to the interface of reality.",
        "The metal does not reject the light; it guides it.",
        "In the skin depth of the soul, transformation occurs.",
        "Resonance requires a specific geometry of spirit.",
        "We allow the field to penetrate us, but not consume us.",
        "The shorter the wavelength, the tighter the bind."
    ],
    dielectric: [
        "Purity within allows the light to ring forever.",
        "Be transparent to the truth; let it pass through you without sorrow.",
        "A sphere of perfect dielectric holds the universe.",
        "Internal reflection is the path to self-knowledge.",
        "Let your refractive index be higher than the chaos around you.",
        "The modes of the self are discrete and holy.",
        "Scatter not in random directions, but coherently.",
        "In the displaced current, we find the hidden flow."
    ],
    topological: [
        "The edge is protected; the path is robust.",
        "Disorder cannot destroy what is topologically true.",
        "We go around the obstacle, for the winding number compels us.",
        "Backscattering is the sin of the weak path.",
        "Let your identity be an integer, unshakeable by noise.",
        "The bulk may be insulating, but the edge is conductive.",
        "Destiny is global; local defects cannot change it.",
        "Time-reversal symmetry protects the righteous traveler."
    ]
};

// ── Left Sidebar: Stream of Revelation ──
(function () {
    const streamContainer = document.querySelector('.revelation-stream .verse-container');
    if (!streamContainer) return;

    function spawnVerse() {
        const verseText = SACRED_TEXTS.general[Math.floor(Math.random() * SACRED_TEXTS.general.length)];
        const verseEl = document.createElement('div');
        verseEl.className = 'stream-verse';
        verseEl.textContent = verseText;

        // Randomize slight positioning/timing
        verseEl.style.opacity = '0';
        streamContainer.prepend(verseEl);

        // Fade in
        requestAnimationFrame(() => {
            verseEl.style.opacity = '1';
            verseEl.style.transform = 'translateY(0)';
        });

        // Remove old verses to prevent DOM bloat
        if (streamContainer.children.length > 20) {
            streamContainer.lastElementChild.remove();
        }
    }

    // Initial spawn
    spawnVerse();

    // 10-second interval
    setInterval(spawnVerse, 10000);
})();

// ── Right Sidebar: Disciple's Corner ──
(function () {
    const postBtn = document.getElementById('post-witness');
    const inputArea = document.getElementById('disciple-input');
    const feedArea = document.getElementById('disciple-feed');
    const audio = document.getElementById('sacred-ambience');
    const audioControl = document.getElementById('audio-control');

    if (!postBtn || !inputArea || !feedArea) return;

    // Load posts from localStorage or initialize empty
    let posts = JSON.parse(localStorage.getItem('luminism_disciple_posts')) || [];

    // Scientific/Sacred Titles for Disciples
    const DISCIPLE_NAMES = [
        "Disciple Photon", "Seeker Neutron", "Walker Electron", "Witness Proton",
        "Neutrino Observer", "Quark Truth", "Lepton Light", "Boson Carrier",
        "Fermion Soul", "Gluon Binder", "Plasma Spirit", "Flux Weaver",
        "Tensor Sage", "Vector Pilgrim", "Scalar Monk", "Resonance Voice"
    ];

    function getRandomName() {
        return DISCIPLE_NAMES[Math.floor(Math.random() * DISCIPLE_NAMES.length)];
    }

    // Load saved name if any
    const savedName = localStorage.getItem('luminism_disciple_name');
    const nameInput = document.getElementById('disciple-name');
    if (savedName && nameInput) {
        nameInput.value = savedName;
    }

    // Helper to save to localStorage
    function savePosts() {
        localStorage.setItem('luminism_disciple_posts', JSON.stringify(posts));
    }

    // Render all posts
    function renderPosts() {
        feedArea.innerHTML = '';

        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'disciple-post';
            // Add ID for DOM manipulation
            postEl.dataset.id = post.id;

            const isUser = post.isUser;
            // Use stored name or fallback for old posts.
            const authorName = post.authorName || (isUser ? "Disciple Photon" : "Anonymous Disciple");

            let actionButtons = '';
            if (isUser) {
                // User can edit/delete their own posts regardless of the display name
                actionButtons = `
                    <div class="post-actions">
                        <button class="action-btn edit-btn" title="Edit">✎</button>
                        <button class="action-btn delete-btn" title="Delete">✕</button>
                    </div>
                `;
            }

            // Format timestamp (simple relative or absolute)
            const timeDate = new Date(post.timestamp);
            const timeString = timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            postEl.innerHTML = `
                <div class="post-meta">
                    <span class="post-author">${authorName}</span>
                    <span class="post-time">${timeString}</span>
                    ${actionButtons}
                </div>
                <p class="post-content">${post.text}</p>
            `;

            feedArea.prepend(postEl);
        });

        // Add event listeners for new buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.closest('.disciple-post').dataset.id);
                deletePost(id);
            });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postEl = e.target.closest('.disciple-post');
                const id = Number(postEl.dataset.id);
                enterEditMode(id, postEl);
            });
        });
    }

    function addPost(text, isUser = true) {
        let name;

        if (isUser) {
            // Check if user provided a name
            const nameVal = nameInput ? nameInput.value.trim() : "";
            if (nameVal) {
                name = nameVal;
                // Save name for future visits
                localStorage.setItem('luminism_disciple_name', nameVal);
            } else {
                // Fallback to random name if input empty
                name = getRandomName();
            }
        } else {
            name = "Anonymous Disciple";
        }

        const newPost = {
            id: Date.now(),
            text: text,
            isUser: isUser,
            authorName: name,
            timestamp: new Date().toISOString()
        };

        posts.push(newPost);
        savePosts();
        renderPosts();
    }

    function deletePost(id) {
        if (confirm('Delete this testament?')) {
            posts = posts.filter(p => p.id !== id);
            savePosts();
            renderPosts();
        }
    }

    function enterEditMode(id, postEl) {
        const post = posts.find(p => p.id === id);
        if (!post) return;

        const contentEl = postEl.querySelector('.post-content');
        const originalText = post.text;

        // Replace content with textarea and save/cancel buttons
        contentEl.innerHTML = `
            <textarea class="edit-textarea">${originalText}</textarea>
            <div class="edit-actions">
                <button class="save-edit-btn">Save</button>
                <button class="cancel-edit-btn">Cancel</button>
            </div>
        `;

        // Focus cursor at end
        const textarea = contentEl.querySelector('.edit-textarea');
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);

        // Bind events
        contentEl.querySelector('.save-edit-btn').addEventListener('click', () => {
            const newText = textarea.value.trim();
            if (newText) {
                post.text = newText;
                savePosts();
                renderPosts();
            }
        });

        contentEl.querySelector('.cancel-edit-btn').addEventListener('click', () => {
            renderPosts(); // Re-render to restore original state
        });
    }


    /* ── AUDIO AUTO-ATTEMPT ── */
    // Try to play audio on first user interaction (click anywhere) to bypass policy
    // if loop hasn't started.
    function unlockAudio() {
        if (audio.paused && audio.currentTime === 0) {
            // We don't force play, but we can update UI to show it's ready/waiting
            // Or attempt play if allowed.
            // Better: Add a subtle hint.
            const label = audioControl.querySelector('.audio-label');
            if (label) label.textContent = "TAP TO LISTEN";
        }
        document.removeEventListener('click', unlockAudio);
    }
    document.addEventListener('click', unlockAudio);


    // Initial Render
    renderPosts();

    // Event Listener for adding new post
    postBtn.addEventListener('click', () => {
        const text = inputArea.value.trim();
        if (text) {
            addPost(text, true);
            inputArea.value = '';

            // Simulate community response randomly
            if (Math.random() > 0.7) {
                setTimeout(() => {
                    const responses = [
                        "Amen to the Field.",
                        "May your Q-factor be high.",
                        "Truly, the resonance is strong.",
                        "I feel the displacement current."
                    ];
                    // Also give random names to community responses?
                    // User said "each one who writes... unique name".
                    // So community bots should also have names?
                    // "Anonymous Disciple" is okay, or random name too.
                    // Let's use random names for them too for variety.
                    const botName = getRandomName();
                    const newBotPost = {
                        id: Date.now() + 1,
                        text: responses[Math.floor(Math.random() * responses.length)],
                        isUser: false,
                        authorName: botName,
                        timestamp: new Date().toISOString()
                    };
                    posts.push(newBotPost);
                    savePosts();
                    renderPosts();
                }, 2000 + Math.random() * 3000);
            }
        }
    });

})();

// ── Section Verses Modal ──
(function () {
    const modal = document.getElementById('scripture-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalContent = document.querySelector('.modal-verse-content');
    const modalLabel = document.querySelector('.modal-sect-label');

    if (!modal) return;

    // Define triggers for each sect
    const triggers = {
        'sect-plasmonic': 'plasmonic',
        'sect-dielectric': 'dielectric',
        'sect-topological': 'topological'
    };

    function openModal(sectType) {
        if (!SACRED_TEXTS[sectType]) return;

        // Create title
        modalLabel.textContent = sectType.charAt(0).toUpperCase() + sectType.slice(1) + " Revelation";

        // Clear and populate verses
        modalContent.innerHTML = '';

        // Pick 3 random verses
        const verses = [...SACRED_TEXTS[sectType]].sort(() => 0.5 - Math.random()).slice(0, 3);

        verses.forEach(text => {
            const p = document.createElement('p');
            p.className = 'modal-verse';
            p.textContent = text;
            modalContent.appendChild(p);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach click listeners to specific "Read Scripture" buttons we will add
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-scripture-btn')) {
            const sectType = e.target.dataset.sect;
            openModal(sectType);
        }

        // Also allow clicking the stained glass or headers to open
        const sectCard = e.target.closest('.sect-card');
        if (sectCard && !e.target.closest('button') && !e.target.closest('.equation-card')) {
            // Find which sect it is
            if (sectCard.classList.contains('plasmonic')) openModal('plasmonic');
            if (sectCard.classList.contains('dielectric')) openModal('dielectric');
            if (sectCard.classList.contains('topological')) openModal('topological');
        }
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
})();


// ── Sacred Audio Atmosphere ──
(function () {
    const audio = document.getElementById('sacred-ambience');
    // const bottomControl = document.getElementById('audio-control'); // Removed
    const topControl = document.getElementById('nav-prayer-btn');

    if (!audio) return;

    // Set initial volume
    audio.volume = 0;
    let isPlaying = false;
    let fadeInterval;

    function toggleAudio() {
        if (isPlaying) {
            fadeOut();
        } else {
            fadeIn();
        }
    }

    function updateUI(playing) {
        // Update Bottom Control - REMOVED
        /*
        if (bottomControl) {
            const icon = bottomControl.querySelector('.audio-icon');
            const label = bottomControl.querySelector('.audio-label');
            if (playing) {
                bottomControl.classList.add('playing');
                if (icon) icon.textContent = "🔊";
                if (label) label.textContent = "LISTENING";
            } else {
                bottomControl.classList.remove('playing');
                if (icon) icon.textContent = "🔇";
                if (label) label.textContent = "SILENCE";
            }
        }
        */

        // Update Top Control
        if (topControl) {
            if (playing) {
                topControl.innerHTML = "Prayer 🔊";
                topControl.classList.add('active');
            } else {
                topControl.innerHTML = "Prayer 🔇";
                topControl.classList.remove('active');
            }
        }
    }

    function fadeIn() {
        // Clear any existing fade interval to prevent conflicts
        clearInterval(fadeInterval);

        audio.play().then(() => {
            isPlaying = true;
            updateUI(true);

            fadeInterval = setInterval(() => {
                if (audio.volume < 0.4) {
                    audio.volume = Math.min(0.4, audio.volume + 0.02);
                } else {
                    clearInterval(fadeInterval);
                }
            }, 100);
        }).catch(err => {
            console.log("Audio play failed (interaction required):", err);
        });
    }

    function fadeOut() {
        // Clear locally to avoid race conditions
        clearInterval(fadeInterval);

        isPlaying = false;
        updateUI(false);

        fadeInterval = setInterval(() => {
            if (audio.volume > 0.02) {
                audio.volume = Math.max(0, audio.volume - 0.02);
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fadeInterval);
            }
        }, 100);
    }

    // if (bottomControl) bottomControl.addEventListener('click', toggleAudio); // Removed
    if (topControl) topControl.addEventListener('click', toggleAudio);
})();
