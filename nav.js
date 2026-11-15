

// nav.js — Compact Single-Row Dropdown Navigation for OrthoTribune
document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("master-nav");
    if (!navContainer) return;

    // Detect current page filename (handles spaces like 'graft_economics 2.html')
    const currentFile = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html");

    const navMenus = [
        {
            id: "menu-evidence",
            label: "🔬 Implant Evidence",
            accent: "#7EA8BE",
            items: [
                {
                    name: "🦴 Cuff & Instability Overview",
                    desc: "Core shoulder repair & instability summary",
                    href: "index.html"
                },
                {
                    name: "🔬 Footprint Microarchitecture",
                    desc: "Greater tuberosity BV/TV & glenoid bone density",
                    href: "anchor_footprints.html"
                },
                {
                    name: "🧬 RC Graft Clinical Evidence & Indications",
                    desc: "Structural healing & indication alignment",
                    href: "graft_economics.html"
                },
                {
                    name: "💪 Proximal Biceps (Coming Soon)",
                    desc: "Tenodesis vs. tenotomy biomechanics",
                    href: "biceps.html",
                    disabled: true
                }
            ]
        },
        {
            id: "menu-economics",
            label: "📊 Implant Economics",
            accent: "#95B8A2",
            items: [
                {
                    name: "⚓ Suture Anchor Economics",
                    desc: "Construct ASP vs. clinical recurrence & healing",
                    href: "economics.html"
                },
                {
                    name: "🩹 RC Graft Economics",
                    desc: "hADM vs. bio-inductive cost-effectiveness",
                    href: "graft_economics 2.html"
                },
                {
                    name: "📈 ROHI Selective Augmentation Economics",
                    desc: "Risk-stratified graft value & reoperation buffer",
                    href: "rohi_economics 2.html"
                },
                {
                    name: "🦾 TSA Economics (Executive Suite)",
                    desc: "Revision multipliers, registries & APAC capacity",
                    href: "arthroplasty.html"
                }
            ]
        },
        {
            id: "menu-tools",
            label: "🧮 VAC Decision Tools",
            accent: "#0f172a",
            items: [
                {
                    name: "🇸🇬 SG Episode & Budget Calculator",
                    desc: "MOH-calibrated hospital bill & patient OOP model",
                    href: "budget_calculator.html"
                },
                {
                    name: "📋 Orthopaedic Value Dossier Generator",
                    desc: "Automated break-even & 4-pillar VAC report",
                    href: "value_dossier_v3.html"
                }
            ]
        }
    ];

    // Inject clean, responsive dropdown CSS
    const style = document.createElement("style");
    style.textContent = `
        .ot-dd-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
            margin: 18px 0 24px 0;
            padding: 10px 14px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            position: relative;
            z-index: 1000;
        }
        .ot-dd-group {
            position: relative;
            display: inline-block;
        }
        .ot-dd-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #ffffff;
            color: #1e293b;
            border: 1px solid #cbd5e1;
            padding: 8px 14px;
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
            background: #0f172a;
            color: #ffffff;
            border-color: #0f172a;
        }
        .ot-dd-chevron {
            font-size: 10px;
            opacity: 0.75;
            transition: transform 0.15s ease;
        }
        .ot-dd-group.open .ot-dd-chevron {
            transform: rotate(180deg);
        }
        .ot-dd-panel {
            display: none;
            position: absolute;
            top: calc(100% + 6px);
            left: 0;
            min-width: 295px;
            max-width: 90vw;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.05);
            padding: 6px;
            z-index: 1001;
        }
        .ot-dd-group.open .ot-dd-panel {
            display: block;
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
            opacity: 0.5;
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
        @media (max-width: 680px) {
            .ot-dd-current-pill {
                display: none;
            }
            .ot-dd-panel {
                min-width: 270px;
            }
        }
    `;
    document.head.appendChild(style);

    // Build Navigation Bar
    const bar = document.createElement("div");
    bar.className = "ot-dd-bar";

    let activePageTitle = "";

    navMenus.forEach(menu => {
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
            panel.appendChild(link);
        });

        // Toggle dropdown on click (works cleanly on mobile tap & desktop click)
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            const isOpen = group.classList.contains("open");
            document.querySelectorAll(".ot-dd-group.open").forEach(g => g.classList.remove("open"));
            if (!isOpen) {
                group.classList.add("open");
            }
        });

        group.appendChild(btn);
        group.appendChild(panel);
        bar.appendChild(group);
    });

    // Subtle breadcrumb indicator on the right side of the bar
    if (activePageTitle) {
        const currentIndicator = document.createElement("span");
        currentIndicator.className = "ot-dd-current-pill";
        currentIndicator.innerHTML = `Viewing: <strong style="color:#0f172a;">${activePageTitle}</strong>`;
        bar.appendChild(currentIndicator);
    }

    navContainer.appendChild(bar);

    // Close dropdowns when clicking anywhere outside
    document.addEventListener("click", function () {
        document.querySelectorAll(".ot-dd-group.open").forEach(g => g.classList.remove("open"));
    });
});
