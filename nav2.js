// nav.js — Global Top-Left Section Switcher, Smooth Page Transitions & Context-Aware Sub-Navigation for OrthoTribune
document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("master-nav");
    if (!navContainer) return;

    const rawFile = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
    const currentFile = rawFile.endsWith(".html") ? rawFile : rawFile + ".html";
    const isMarketsPage = (currentFile === "apac_markets.html" || currentFile === "sea_gc_markets.html" || window.location.pathname.toLowerCase().includes("apac_markets"));
    const isAboutPage = (currentFile === "about.html" || window.location.pathname.toLowerCase().includes("about"));
    const isDesignPage = (currentFile === "design_economics.html" || window.location.pathname.toLowerCase().includes("design_economics"));
    const isAvbcPage = (currentFile === "apac_vbc.html" || window.location.pathname.toLowerCase().includes("apac_vbc"));
    

    // Top-Left Global Section Switcher
    const globalSections = [
        {
            id: "upper-extremity",
            name: "Upper Extremity",
            subtitle: "Implant Evidence, Economics & VAC Tools",
            href: "index.html"
        },
        {
            id: "regional-markets",
            name: "SEA & Greater China Markets",
            subtitle: "Orthopaedic Sports Market Profile (SG, MY, TH, ID, TW, HK)",
            href: "apac_markets.html"
        },
        {
            id: "design-economics",
            name: "Implant Design & MedTech Economics",
            subtitle: "Engineering rationale, manufacturing drivers & hospital value",
            href: "design_economics.html"
        },
        {
            id: "apac-vbc",
            name: "APAC Value-Based Care & SG AVBC",
            subtitle: "HTA criteria, payer shifts & why MedTech needs health economics",
            href: "apac_vbc.html"
        },
        {
            id: "about-page",
            name: "About OrthoTribune",
            subtitle: "Project background & methodology",
            href: "about.html"
        }
    ];

    // Upper Extremity Sub-Menus (shown ONLY when viewing Upper Extremity pages)
    const upperExtremityMenus = [
        {
            id: "menu-evidence",
            label: "🔬 Implant Evidence",
            items: [
                {
                    name: "Cuff & Instability Overview (Home)",
                    desc: "Core shoulder repair & instability summary",
                    href: "index.html"
                },
                {
                    name: "Footprint Microarchitecture",
                    desc: "Greater tuberosity BV/TV & glenoid bone density",
                    href: "anchor_footprints.html"
                },
                {
                    name: "RC Graft Clinical Evidence & Indications",
                    desc: "Structural healing & indication alignment",
                    href: "graft_economics.html"
                },
                {
                    name: "Proximal Biceps: Evidence & Trade-Offs",
                    desc: "Tenotomy vs. tenodesis, fixation constructs & location",
                    href: "biceps.html"
                }
            ]
        },
        {
            id: "menu-economics",
            label: "📊 Implant Economics",
            items: [
                {
                    name: "Suture Anchor Economics",
                    desc: "Construct ASP vs. clinical recurrence & healing",
                    href: "economics.html"
                },
                {
                    name: "RC Graft Economics",
                    desc: "hADM vs. bio-inductive cost-effectiveness",
                    href: "graft_economics 2.html"
                },
                {
                    name: "ROHI Selective Augmentation Economics",
                    desc: "Risk-stratified graft value & reoperation buffer",
                    href: "rohi_economics 2.html"
                },
                {
                    name: "TSA Economics (Executive Suite)",
                    desc: "Revision multipliers, registries & regional capacity",
                    href: "arthroplasty.html"
                }
            ]
        },
        {
            id: "menu-tools",
            label: "🧮 VAC Decision Tools",
            items: [
                {
                    name: "SG Episode & Budget Calculator",
                    desc: "MOH-calibrated hospital bill & patient OOP model",
                    href: "budget_calculator.html"
                },
                {
                    name: "Orthopaedic Value Dossier Generator",
                    desc: "Automated break-even & 4-pillar VAC report",
                    href: "value_dossier_v3.html"
                }
            ]
        }
    ];

    // Inject clean styles + smooth cross-page fade/slide transitions
    const style = document.createElement("style");
    style.textContent = `
        @view-transition {
            navigation: auto;
        }
        @keyframes otPageEnter {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
        body {
            animation: otPageEnter 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            transition: opacity 0.24s ease, transform 0.24s ease;
        }
        body.ot-page-leaving {
            opacity: 0 !important;
            transform: translateY(-5px);
        }
        .ot-nav-shell {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            margin: 0 0 22px 0;
            padding-bottom: 14px;
            border-bottom: 1px solid #e2e8f0;
            position: relative;
            z-index: 1000;
        }
        .ot-dd-group {
            position: relative;
            display: inline-block;
        }
        .ot-global-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #0f172a;
            color: #ffffff;
            border: 1px solid #0f172a;
            padding: 8px 14px;
            font-size: 13px;
            font-weight: 700;
            border-radius: 7px;
            cursor: pointer;
            font-family: inherit;
            transition: all 0.15s ease;
        }
        .ot-global-btn:hover {
            background: #1e293b;
        }
        .ot-divider {
            width: 1px;
            height: 22px;
            background: #cbd5e1;
            margin: 0 4px;
        }
        @media (max-width: 680px) {
            .ot-divider { display: none; }
        }
        .ot-dd-btn {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            background: #ffffff;
            color: #1e293b;
            border: 1px solid #cbd5e1;
            padding: 8px 13px;
            font-size: 13px;
            font-weight: 600;
            border-radius: 7px;
            cursor: pointer;
            font-family: inherit;
            transition: all 0.15s ease;
        }
        .ot-dd-btn:hover {
            background: #f1f5f9;
            border-color: #94a3b8;
        }
        .ot-dd-btn.active-group {
            background: #eef2ff;
            color: #1e1b4b;
            border-color: #a5b4fc;
        }
        .ot-dd-chevron {
            font-size: 10px;
            opacity: 0.8;
            transition: transform 0.18s ease;
        }
        .ot-dd-group.open .ot-dd-chevron {
            transform: rotate(180deg);
        }
        .ot-dd-panel {
            display: none;
            position: absolute;
            top: calc(100% + 6px);
            left: 0;
            min-width: 310px;
            max-width: 90vw;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.05);
            padding: 6px;
            z-index: 1001;
            animation: otMenuDrop 0.16s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes otMenuDrop {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .ot-dd-group.open .ot-dd-panel {
            display: block;
        }
        .ot-dd-header-note {
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #64748b;
            padding: 6px 12px 4px 12px;
        }
        .ot-dd-item {
            display: block;
            text-decoration: none;
            padding: 9px 12px;
            border-radius: 7px;
            transition: background 0.12s ease;
            margin-bottom: 2px;
        }
        .ot-dd-item:last-child {
            margin-bottom: 0;
        }
        .ot-dd-item:hover {
            background: #f1f5f9;
        }
        .ot-dd-item.active-item {
            background: #eff6ff;
            border-left: 3px solid #7EA8BE;
        }
        .ot-dd-item.disabled {
            opacity: 0.55;
            pointer-events: none;
        }
        .ot-dd-item-title {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 2px;
        }
        .ot-dd-item.active-item .ot-dd-item-title {
            color: #0369a1;
        }
        .ot-dd-item-desc {
            display: block;
            font-size: 11.5px;
            color: #64748b;
            line-height: 1.35;
        }
        .ot-dd-current-pill {
            margin-left: auto;
            font-size: 12px;
            color: #64748b;
            font-weight: 500;
            padding-right: 4px;
        }
        @media (max-width: 780px) {
            .ot-dd-current-pill { display: none; }
            .ot-dd-panel { min-width: 270px; }
        }
    `;
    document.head.appendChild(style);

    function navigateWithTransition(url) {
        document.body.classList.add("ot-page-leaving");
        setTimeout(function () {
            window.location.href = url;
        }, 210);
    }

    const bar = document.createElement("div");
    bar.className = "ot-nav-shell";

    // 1. Top-Left Global Section Dropdown
    const globalGroup = document.createElement("div");
    globalGroup.className = "ot-dd-group";
    globalGroup.id = "global-section-switcher";

    let currentGlobalLabel = "Upper Extremity";
    if (isMarketsPage) {
        currentGlobalLabel = "SEA & Greater China Markets";
    } else if (isDesignPage) {
        currentGlobalLabel = "Implant Design & MedTech Economics";
    } else if (isAvbcPage) {
        currentGlobalLabel = "APAC Value-Based Care & SG AVBC";
    } else if (isAboutPage) {
        currentGlobalLabel = "About OrthoTribune";
    }

    const globalBtn = document.createElement("button");
    globalBtn.type = "button";
    globalBtn.className = "ot-global-btn";
    globalBtn.innerHTML = `<span>${currentGlobalLabel}</span><span class="ot-dd-chevron">▼</span>`;

    const globalPanel = document.createElement("div");
    globalPanel.className = "ot-dd-panel";
    globalPanel.innerHTML = `<div class="ot-dd-header-note">Select Section</div>`;

    globalSections.forEach(sec => {
        const isCurrent =
            (sec.id === "regional-markets" && isMarketsPage) ||
            (sec.id === "apac-vbc" && isAvbcPage) ||
            (sec.id === "design-economics" && isDesignPage) ||
            (sec.id === "about-page" && isAboutPage) ||
            (sec.id === "upper-extremity" && !isMarketsPage && !isAboutPage && !isDesignPage && !isAvbcPage);

        const sLink = document.createElement("a");
        sLink.href = "./" + sec.href;
        sLink.className = "ot-dd-item" + (isCurrent ? " active-item" : "");
        sLink.innerHTML = `
            <span class="ot-dd-item-title">${sec.name}</span>
            <span class="ot-dd-item-desc">${sec.subtitle}</span>
        `;
        sLink.addEventListener("click", function (e) {
            if (!isCurrent && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                navigateWithTransition(sLink.href);
            }
        });
        globalPanel.appendChild(sLink);
    });

    globalBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const isOpen = globalGroup.classList.contains("open");
        document.querySelectorAll(".ot-dd-group.open").forEach(g => g.classList.remove("open"));
        if (!isOpen) globalGroup.classList.add("open");
    });

    globalGroup.appendChild(globalBtn);
    globalGroup.appendChild(globalPanel);
    bar.appendChild(globalGroup);

    // 2. Render Upper Extremity Sub-Dropdowns ONLY on Upper Extremity pages
    if (!isMarketsPage && !isAboutPage && !isDesignPage && !isAvbcPage) {
        const divider = document.createElement("div");
        divider.className = "ot-divider";
        bar.appendChild(divider);

        let activePageTitle = "";

        upperExtremityMenus.forEach(menu => {
            const group = document.createElement("div");
            group.className = "ot-dd-group";
            group.id = menu.id;

            const hasActiveChild = menu.items.some(item => item.href === currentFile);

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "ot-dd-btn" + (hasActiveChild ? " active-group" : "");
            btn.innerHTML = `<span>${menu.label}</span><span class="ot-dd-chevron">▼</span>`;

            const panel = document.createElement("div");
            panel.className = "ot-dd-panel";

            menu.items.forEach(item => {
                const link = document.createElement("a");
                link.href = "./" + item.href;
                link.className = "ot-dd-item";

                if (item.disabled) {
                    link.classList.add("disabled");
                } else if (item.href === currentFile) {
                    link.classList.add("active-item");
                    activePageTitle = item.name;
                }

                link.innerHTML = `
                    <span class="ot-dd-item-title">${item.name}</span>
                    <span class="ot-dd-item-desc">${item.desc}</span>
                `;
                link.addEventListener("click", function (e) {
                    if (item.href !== currentFile && !e.metaKey && !e.ctrlKey) {
                        e.preventDefault();
                        navigateWithTransition(link.href);
                    }
                });
                panel.appendChild(link);
            });

            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                const isOpen = group.classList.contains("open");
                document.querySelectorAll(".ot-dd-group.open").forEach(g => g.classList.remove("open"));
                if (!isOpen) group.classList.add("open");
            });

            group.appendChild(btn);
            group.appendChild(panel);
            bar.appendChild(group);
        });

        if (activePageTitle) {
            const currentIndicator = document.createElement("span");
            currentIndicator.className = "ot-dd-current-pill";
            currentIndicator.innerHTML = `Viewing: <strong style="color:#0f172a;">${activePageTitle}</strong>`;
            bar.appendChild(currentIndicator);
        }
    }

    navContainer.appendChild(bar);

    document.addEventListener("click", function () {
        document.querySelectorAll(".ot-dd-group.open").forEach(g => g.classList.remove("open"));
    });

    window.addEventListener("pageshow", function () {
        document.body.classList.remove("ot-page-leaving");
    });
});


