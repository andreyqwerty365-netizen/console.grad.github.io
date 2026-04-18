const CONFIG = {
  siteUrl: "https://andreyqwerty365-netizen.github.io/",
  formEndpoint: "",
  gaMeasurementId: "",
  yandexMetrikaId: "",
  telegramUrl: "https://t.me/KonsolGrad",
  briefTelegramUrl: "https://t.me/+79778662724",
  telegramShareUrl: "https://t.me/share/url",
  vkUrl: "https://vk.ru/club237339856",
  ...window.CONSOLEGRAD_CONFIG,
};

const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");
const tiltItems = document.querySelectorAll(".tilt");
const controller = document.getElementById("controller-hero");
const controllerRotor = document.querySelector(".controller__rotor");
const heroVisual = document.querySelector(".hero__visual");
const topbar = document.querySelector(".topbar");
const topbarToggle = document.querySelector(".topbar__toggle");
const topbarLinks = document.querySelectorAll(".topbar__nav a, .topbar__cta");
const canvas = document.getElementById("energy-grid");
const seatRange = document.getElementById("seat-range");
const seatValue = document.getElementById("seats-value");
const venueType = document.getElementById("venue-type");
const priorityType = document.getElementById("priority-type");
const briefPackageField = document.getElementById("brief-package-field");
const briefSummaryField = document.getElementById("brief-summary-field");
const briefPackage = document.getElementById("brief-package");
const briefSummary = document.getElementById("brief-summary");
const briefList = document.getElementById("brief-list");
const briefForm = document.getElementById("brief-form");
const briefSubmit = document.getElementById("brief-submit");
const briefStatus = document.getElementById("brief-status");
const briefConsent = document.getElementById("brief-consent");
const briefChips = document.querySelectorAll(".brief-chip");
const priorityHint = document.getElementById("priority-hint");
const buildSequenceVideo = document.getElementById("build-sequence-video");
const buildStageCards = document.querySelectorAll(".build-stage-card");
const copyButtons = document.querySelectorAll(".contact-copy");
const contactCallButtons = document.querySelectorAll(".contact-call-button");
const contactSection = document.getElementById("contacts");
const softwareClockValue = document.getElementById("software-clock-value");
const softwareActiveCount = document.getElementById("software-active-count");
const stationCards = document.querySelectorAll(".station[data-station-name]");
const softwareSelectedTitle = document.getElementById("software-selected-title");
const softwareSelectedMeta = document.getElementById("software-selected-meta");
const softwareSelectedStatus = document.getElementById("software-selected-status");
const trackedLinks = document.querySelectorAll("a[href], button[data-copy]");
const visibilityVideos = document.querySelectorAll("[data-play-when-visible]");

const isDesktopLike = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const priorityDescriptions = {
  "Быстрый запуск": "Когда нужно как можно быстрее открыть работающую зону и не растягивать старт на месяцы.",
  "Атмосфера и дизайн": "Когда важнее первое впечатление, свет, посадка, настроение и желание гостя вернуться ещё раз.",
  "Максимальная загрузка и масштаб": "Когда проект сразу должен выдерживать поток гостей, высокий спрос и дальнейшее расширение форматов.",
  "Премиальный вау-эффект": "Когда зона должна работать как сильный визуальный магнит и производить эффект уже с первых секунд."
};

function initializeAnalytics() {
  window.dataLayer = window.dataLayer || [];

  if (CONFIG.gaMeasurementId) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(CONFIG.gaMeasurementId)}`;
    document.head.appendChild(gaScript);

    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", CONFIG.gaMeasurementId, {
      anonymize_ip: true,
      page_path: window.location.pathname,
    });
  }

  if (CONFIG.yandexMetrikaId) {
    const ymScript = document.createElement("script");
    ymScript.async = true;
    ymScript.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(ymScript);

    window.ym = window.ym || function ymProxy() {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();
    window.ym(CONFIG.yandexMetrikaId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false,
    });
  }
}

function trackEvent(name, params = {}) {
  const payload = {
    event: name,
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  if (typeof window.ym === "function" && CONFIG.yandexMetrikaId) {
    window.ym(CONFIG.yandexMetrikaId, "reachGoal", name, params);
  }

  document.dispatchEvent(new CustomEvent("consolegrad:analytics", { detail: payload }));
}

function setBriefStatus(message, type = "") {
  if (!briefStatus) {
    return;
  }

  briefStatus.textContent = message;
  briefStatus.classList.remove("is-success", "is-error");

  if (type) {
    briefStatus.classList.add(type);
  }
}

function setSubmittingState(isSubmitting) {
  if (!briefSubmit) {
    return;
  }

  const disabled = isSubmitting || Boolean(briefConsent && !briefConsent.checked);

  briefSubmit.disabled = disabled;
  briefSubmit.toggleAttribute("disabled", disabled);
  briefSubmit.setAttribute("aria-disabled", String(disabled));
  briefSubmit.textContent = isSubmitting ? "Отправляем заявку..." : "Отправить стартовый план";
}

function syncBriefSubmitState() {
  if (!briefSubmit) {
    return;
  }

  const disabled = Boolean(briefConsent && !briefConsent.checked);
  briefSubmit.disabled = disabled;
  briefSubmit.toggleAttribute("disabled", disabled);
  briefSubmit.setAttribute("aria-disabled", String(disabled));
}

function formatSeatLabel(seats) {
  if (seats % 10 === 1 && seats % 100 !== 11) {
    return `${seats} игровое место`;
  }

  if ([2, 3, 4].includes(seats % 10) && ![12, 13, 14].includes(seats % 100)) {
    return `${seats} игровых места`;
  }

  return `${seats} игровых мест`;
}

function persistBriefDraft(payload) {
  try {
    window.localStorage.setItem("consolegrad:last-request", JSON.stringify(payload));
  } catch (error) {
    // Ignore storage failures.
  }
}

function buildLeadPayload() {
  const formData = new FormData(briefForm);
  const extras = formData.getAll("extras");

  return {
    submittedAt: new Date().toISOString(),
    siteUrl: CONFIG.siteUrl,
    pageUrl: window.location.href,
    recommendedPackage: String(formData.get("recommendedPackage") || ""),
    recommendedSummary: String(formData.get("recommendedSummary") || ""),
    leadName: String(formData.get("leadName") || "").trim(),
    leadPhone: String(formData.get("leadPhone") || "").trim(),
    leadTelegram: String(formData.get("leadTelegram") || "").trim(),
    leadNotes: String(formData.get("leadNotes") || "").trim(),
    venueType: String(formData.get("venueType") || ""),
    priority: String(formData.get("priority") || ""),
    seats: Number(formData.get("seats") || 0),
    extras,
  };
}

function validateLeadPayload(payload) {
  if (!payload.leadName) {
    return "Укажите, как к вам обращаться.";
  }

  if (!payload.leadPhone && !payload.leadTelegram) {
    return "Оставьте телефон или Telegram, чтобы мы могли связаться с вами.";
  }

  if (briefConsent && !briefConsent.checked) {
    return "Подтвердите согласие на обработку контактных данных.";
  }

  return "";
}

function formatLeadMessage(payload) {
  const extraLine = payload.extras.length ? payload.extras.join(", ") : "без дополнительных модулей";

  return [
    "Новая заявка с сайта КонсольГрад",
    `Имя: ${payload.leadName}`,
    `Телефон: ${payload.leadPhone || "не указан"}`,
    `Telegram: ${payload.leadTelegram || "не указан"}`,
    `Площадка: ${payload.venueType}`,
    `Мест: ${payload.seats}`,
    `Приоритет: ${payload.priority}`,
    `Дополнительно: ${extraLine}`,
    `Рекомендация: ${payload.recommendedPackage}`,
    `Комментарий: ${payload.leadNotes || "не указан"}`,
  ].join("\n");
}

function copyTextFallback(text) {
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "-9999px";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.focus();
  helper.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(helper);
  return copied;
}

async function copyBriefToClipboard(message) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch (error) {
      return copyTextFallback(message);
    }
  }

  return copyTextFallback(message);
}

function buildTelegramDraftUrl(message) {
  const baseUrl = CONFIG.briefTelegramUrl || CONFIG.telegramUrl;
  const encodedMessage = encodeURIComponent(message);
  const phoneCandidate = baseUrl.match(/\+?\d[\d\s()-]{8,}/)?.[0] || "";
  const phone = phoneCandidate.replace(/\D/g, "");

  if (phone) {
    return {
      appUrl: `tg://resolve?phone=${phone}&text=${encodedMessage}`,
      webUrl: `${CONFIG.telegramShareUrl}?url=${encodeURIComponent(CONFIG.siteUrl)}&text=${encodedMessage}`,
    };
  }

  try {
    const url = new URL(baseUrl);
    const username = url.pathname.replace(/^\/+/, "");

    return {
      appUrl: username ? `tg://resolve?domain=${encodeURIComponent(username)}&text=${encodedMessage}` : "",
      webUrl: username
        ? `${CONFIG.telegramShareUrl}?url=${encodeURIComponent(baseUrl)}&text=${encodedMessage}`
        : `${CONFIG.telegramShareUrl}?url=${encodeURIComponent(CONFIG.siteUrl)}&text=${encodedMessage}`,
    };
  } catch (error) {
    return {
      appUrl: "",
      webUrl: `${CONFIG.telegramShareUrl}?url=${encodeURIComponent(CONFIG.siteUrl)}&text=${encodedMessage}`,
    };
  }
}

function openTelegramDraft(target) {
  if (target.appUrl) {
    window.location.href = target.appUrl;
    window.setTimeout(() => {
      if (!document.hidden && target.webUrl) {
        window.location.href = target.webUrl;
      }
    }, 720);
    return;
  }

  const destination = target.webUrl;

  if (!destination) {
    return;
  }

  window.location.href = destination;
}

async function fallbackToTelegram(payload) {
  const message = formatLeadMessage(payload);
  const copied = await copyBriefToClipboard(message);

  persistBriefDraft({
    ...payload,
    fallbackMode: "telegram-manual",
    message,
  });

  return {
    mode: "telegram-fallback",
    message,
    copied,
    target: buildTelegramDraftUrl(message),
  };
}

async function submitLead(payload) {
  if (CONFIG.formEndpoint) {
    const response = await fetch(CONFIG.formEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Lead endpoint returned ${response.status}`);
    }

    return { mode: "endpoint" };
  }

  return fallbackToTelegram(payload);
}

initializeAnalytics();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target.hasAttribute("data-counter")) {
        animateCounter(entry.target);
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));
counters.forEach((counter) => revealObserver.observe(counter));

function animateCounter(node) {
  if (node.dataset.animated === "true") {
    return;
  }

  node.dataset.animated = "true";
  const target = Number(node.dataset.counter);
  const startTime = performance.now();
  const duration = 1400;

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

tiltItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 8;
    const rotateY = (x - 0.5) * 8;

    item.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

if (controller && controllerRotor && heroVisual) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 22;
    const rotateX = (0.5 - y) * 10 - 7;

    controllerRotor.style.animation = "none";
    controllerRotor.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateY * 0.06}deg)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    controllerRotor.style.transform = "";
    controllerRotor.style.animation = "";
  });
}

if (topbar && topbarToggle) {
  topbarToggle.addEventListener("click", () => {
    const next = !topbar.classList.contains("is-open");
    topbar.classList.toggle("is-open", next);
    topbarToggle.setAttribute("aria-expanded", String(next));
  });

  topbarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth > 820) {
        return;
      }

      topbar.classList.remove("is-open");
      topbarToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      topbar.classList.remove("is-open");
      topbarToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (canvas) {
  const context = canvas.getContext("2d");
  const particles = [];
  const particleCount = 66;

  function resizeCanvas() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function createParticles() {
    particles.length = 0;
    for (let index = 0; index < particleCount; index += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        radius: Math.random() * 2.2 + 0.8,
      });
    }
  }

  function drawParticles() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > window.innerWidth) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > window.innerHeight) {
        particle.vy *= -1;
      }

      context.beginPath();
      context.fillStyle = index % 7 === 0 ? "rgba(255, 226, 83, 0.75)" : "rgba(87, 198, 255, 0.72)";
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    for (let first = 0; first < particles.length; first += 1) {
      for (let second = first + 1; second < particles.length; second += 1) {
        const a = particles[first];
        const b = particles[second];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 120) {
          continue;
        }

        context.beginPath();
        context.strokeStyle = `rgba(87, 198, 255, ${0.12 - distance / 1200})`;
        context.lineWidth = 1;
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  createParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}

function getBriefRecommendation() {
  if (!briefForm) {
    return null;
  }

  const formData = new FormData(briefForm);
  const seats = Number(formData.get("seats"));
  const venue = String(formData.get("venueType"));
  const priority = String(formData.get("priority"));
  const extras = formData.getAll("extras");

  const venueLower = venue.toLowerCase();
  let packageName = "Старт";
  let summary = "Компактный запуск для теста спроса с минимально необходимой комплектацией.";
  const bullets = [
    formatSeatLabel(seats),
    "базовая конфигурация оборудования",
    "быстрый запуск без сложного сценария монтажа",
  ];

  const needsScale =
    seats >= 7 ||
    priority === "Максимальная загрузка и масштаб" ||
    venueLower.includes("тц") ||
    venueLower.includes("кино") ||
    venueLower.includes("развлекатель") ||
    venueLower.includes("событийн") ||
    venueLower.includes("event") ||
    venueLower.includes("клуб");

  const needsAtmosphere =
    seats >= 4 ||
    priority === "Атмосфера и дизайн" ||
    priority === "Премиальный вау-эффект" ||
    venueLower.includes("бар") ||
    venueLower.includes("отел") ||
    venueLower.includes("spa") ||
    venueLower.includes("спа") ||
    venueLower.includes("бан") ||
    venueLower.includes("детейл") ||
    venueLower.includes("автомой") ||
    venueLower.includes("клиник");

  if (needsScale) {
    packageName = "Флагман";
    summary = "Подходит для крупной зоны с расширением форматов, высокой нагрузкой и более серьёзной операционной логикой.";
    bullets[1] = "расширенная зона с масштабированием и сервисным регламентом";
    bullets[2] = "подготовка под высокий поток гостей и дополнительные форматы";
  } else if (needsAtmosphere) {
    packageName = "Оптимум";
    summary = "Оптимальный вариант для пространства, где важны визуальная подача, комфорт и контроль игровых сессий.";
    bullets[1] = "дизайн-концепт, свет и кабель-менеджмент";
    bullets[2] = "подготовка под повторные визиты и удобную работу администратора";
  }

  if (extras.length) {
    bullets.push(`дополнительно: ${extras.join(", ")}`);
  }

    if (!extras.includes("PS Lounge") && packageName !== "Старт") {
      bullets.push("сюда стоит добавить PS Lounge для контроля сессий и статусов");
    }

  return { packageName, summary, bullets };
}

function renderBriefRecommendation() {
  const recommendation = getBriefRecommendation();
  if (!recommendation || !briefPackage || !briefSummary || !briefList) {
    return;
  }

  briefPackage.textContent = recommendation.packageName;
  briefSummary.textContent = recommendation.summary;
  briefList.innerHTML = recommendation.bullets.map((item) => `<li>${item}</li>`).join("");

  if (briefPackageField) {
    briefPackageField.value = recommendation.packageName;
  }

  if (briefSummaryField) {
    briefSummaryField.value = recommendation.summary;
  }
}

if (seatRange && seatValue) {
  seatValue.textContent = seatRange.value;
  seatRange.addEventListener("input", () => {
    seatValue.textContent = seatRange.value;
    renderBriefRecommendation();
  });
}

if (briefForm) {
  briefForm.addEventListener("input", () => {
    renderBriefRecommendation();
    syncBriefSubmitState();
  });
  venueType?.addEventListener("change", renderBriefRecommendation);
  priorityType?.addEventListener("change", renderBriefRecommendation);
  briefConsent?.addEventListener("input", syncBriefSubmitState);
  briefConsent?.addEventListener("change", syncBriefSubmitState);
  syncBriefSubmitState();

  briefForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = buildLeadPayload();
    const validationError = validateLeadPayload(payload);

    if (validationError) {
      setBriefStatus(validationError, "is-error");
      trackEvent("lead_form_validation_error", {
        reason: validationError,
      });
      return;
    }

    setSubmittingState(true);
    setBriefStatus("Подготавливаем и отправляем вашу заявку...");

    try {
      const result = await submitLead(payload);
      trackEvent("lead_form_submit", {
        package_name: payload.recommendedPackage,
        venue_type: payload.venueType,
        seats: payload.seats,
        delivery_mode: result.mode,
      });

      if (result.mode === "endpoint") {
        setBriefStatus("Заявка отправлена. Мы свяжемся с вами после просмотра вводных.", "is-success");
      } else {
        setBriefStatus(
          result.copied
            ? "Открываем Telegram Данила. Текст заявки уже подготовлен и также сохранён в буфере обмена."
            : "Открываем Telegram Данила. Если текст не подставится автоматически, его можно вставить из буфера браузера.",
          "is-success",
        );
        trackEvent(result.copied ? "lead_form_copy_ready" : "lead_form_copy_ready_error", {
          copied: result.copied,
        });
        trackEvent("lead_form_telegram_redirect", {
          copied: result.copied,
          target: result.target.webUrl || CONFIG.briefTelegramUrl || CONFIG.telegramUrl,
        });
        openTelegramDraft(result.target);
      }
    } catch (error) {
      trackEvent("lead_form_submit_error", {
        message: error instanceof Error ? error.message : "unknown_error",
      });
      setBriefStatus("Не удалось отправить заявку автоматически. Попробуйте ещё раз или свяжитесь через Telegram.", "is-error");
    } finally {
      setSubmittingState(false);
    }
  });

  renderBriefRecommendation();
}

contactCallButtons.forEach((button) => {
  const defaultLabel = button.textContent || "Позвонить сейчас";

  button.addEventListener("click", async (event) => {
    if (!isDesktopLike()) {
      return;
    }

    event.preventDefault();

    const phone = button.dataset.phone;

    if (!phone) {
      return;
    }

    const copied = await copyBriefToClipboard(phone);

    if (copied) {
      button.classList.add("is-copied");
      button.textContent = "Номер скопирован";
      trackEvent("contact_phone_copy", { location: "contacts_cta" });

      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.textContent = defaultLabel;
      }, 2200);
      return;
    }

    window.location.href = button.href;
  });
});

briefChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const name = chip.dataset.name;
    const value = chip.dataset.value;
    const target = briefForm?.querySelector(`[name="${name}"]`);

    if (!target) {
      return;
    }

    target.value = value;

    briefForm
      ?.querySelectorAll(`.brief-chip[data-name="${name}"]`)
      .forEach((button) => button.classList.remove("is-active"));

    chip.classList.add("is-active");

    if (name === "priority" && priorityHint) {
      priorityHint.textContent = chip.dataset.tooltip || priorityDescriptions[value] || "";
    }

    trackEvent("brief_interaction", {
      control: name,
      value,
    });

    renderBriefRecommendation();
  });

  if (chip.dataset.name === "priority" && priorityHint) {
    chip.addEventListener("mouseenter", () => {
      priorityHint.textContent = chip.dataset.tooltip || priorityDescriptions[chip.dataset.value] || "";
    });

    chip.addEventListener("focus", () => {
      priorityHint.textContent = chip.dataset.tooltip || priorityDescriptions[chip.dataset.value] || "";
    });

    chip.addEventListener("mouseleave", () => {
      const activeChip = briefForm?.querySelector('.brief-chip[data-name="priority"].is-active');
      priorityHint.textContent =
        activeChip?.dataset.tooltip ||
        priorityDescriptions[priorityType?.value] ||
        "";
    });
  }
});

briefForm?.querySelectorAll('input[name="extras"]').forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    const control = event.currentTarget;
    if (!(control instanceof HTMLInputElement)) {
      return;
    }

    trackEvent("brief_interaction", {
      control: "extras",
      value: control.value,
      checked: control.checked,
    });
  });
});

if (priorityHint) {
  priorityHint.textContent =
    priorityDescriptions[priorityType?.value] ||
    "Когда нужно как можно быстрее открыть работающую зону и не растягивать старт на месяцы.";
}

if (buildSequenceVideo && buildStageCards.length) {
  const buildTimeline = [
    { from: 0, to: 0.24 },
    { from: 0.24, to: 0.46 },
    { from: 0.46, to: 0.67 },
    { from: 0.67, to: 0.84 },
    { from: 0.84, to: 1 },
  ];

  let activeBuildPhase = -1;

  function applyBuildPhase(index) {
    if (index === activeBuildPhase || !buildTimeline[index]) {
      return;
    }

    activeBuildPhase = index;

    buildStageCards.forEach((card) => {
      card.classList.toggle("is-active", Number(card.dataset.buildPhase) === index);
    });
  }

  function syncBuildPhase() {
    const duration = buildSequenceVideo.duration;
    if (!duration || Number.isNaN(duration)) {
      applyBuildPhase(0);
      return;
    }

    const progress = (buildSequenceVideo.currentTime % duration) / duration;
    const nextIndex = buildTimeline.findIndex((phase) => progress >= phase.from && progress < phase.to);
    applyBuildPhase(nextIndex === -1 ? buildTimeline.length - 1 : nextIndex);
  }

  buildSequenceVideo.addEventListener("loadedmetadata", syncBuildPhase);
  buildSequenceVideo.addEventListener("timeupdate", syncBuildPhase);
  buildSequenceVideo.addEventListener("seeking", syncBuildPhase);
  buildSequenceVideo.addEventListener("play", syncBuildPhase);
  buildSequenceVideo.addEventListener("ended", () => applyBuildPhase(0));

  applyBuildPhase(0);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    if (!value) {
      return;
    }

    const originalLabel = button.textContent;

    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Номер скопирован";
      button.classList.add("is-copied");
      trackEvent("contact_copy_click", { phone: value });
    } catch (error) {
      button.textContent = "Скопируйте вручную";
      trackEvent("contact_copy_click_error", { phone: value });
    }

    window.setTimeout(() => {
      button.textContent = originalLabel;
      button.classList.remove("is-copied");
    }, 1800);
  });
});

trackedLinks.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.matches(".contact-copy")) {
      return;
    }

    const href = element.getAttribute("href") || "";
    let eventName = "";
    const params = { href };

    if (href.startsWith("tel:")) {
      eventName = "contact_phone_click";
    } else if (href.includes("t.me")) {
      eventName = "contact_telegram_click";
    } else if (href.includes("vk.ru")) {
      eventName = "contact_vk_click";
    } else if (href === "#brief" || href === "#contacts") {
      eventName = "cta_navigation_click";
    }

    if (eventName) {
      trackEvent(eventName, params);
    }
  });
});

function renderSelectedStation(card) {
  if (!card || !softwareSelectedTitle || !softwareSelectedMeta || !softwareSelectedStatus) {
    return;
  }

  const name = card.dataset.stationName || "Станция";
  const status = card.dataset.stationStatus || "Свободна";
  const tariff = card.dataset.stationTariff || "—";
  const paid = card.dataset.stationPaid || "—";
  const payment = card.dataset.stationPayment || "—";

  softwareSelectedTitle.textContent = `${name} — управление`;
  softwareSelectedMeta.textContent = `Тариф: ${tariff} • Сумма: ${paid} • Оплата: ${payment}`;
  softwareSelectedStatus.textContent = status;
}

if (stationCards.length) {
  const activeCount = Array.from(stationCards).filter((card) => !card.classList.contains("station--free")).length;
  if (softwareActiveCount) {
    softwareActiveCount.textContent = String(activeCount);
  }

  const applySelectedStation = (card) => {
    stationCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    renderSelectedStation(card);
  };

  stationCards.forEach((card) => {
    card.addEventListener("click", () => {
      applySelectedStation(card);
      trackEvent("software_station_preview_select", {
        station_name: card.dataset.stationName || "",
        station_status: card.dataset.stationStatus || "",
      });
    });
  });

  const initialCard = document.querySelector(".station.is-selected") || stationCards[0];
  if (initialCard instanceof HTMLElement) {
    applySelectedStation(initialCard);
  }
}

if (contactSection) {
  const contactObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        trackEvent("contacts_section_view", { visible: true });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  contactObserver.observe(contactSection);
}

if (visibilityVideos.length) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (!(video instanceof HTMLVideoElement)) {
          return;
        }

        if (entry.isIntersecting) {
          const playAttempt = video.play();
          if (playAttempt && typeof playAttempt.catch === "function") {
            playAttempt.catch(() => {});
          }
          return;
        }

        video.pause();
      });
    },
    { threshold: 0.35 }
  );

  visibilityVideos.forEach((video) => videoObserver.observe(video));
}
