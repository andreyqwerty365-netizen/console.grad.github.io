const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");
const tiltItems = document.querySelectorAll(".tilt");
const controller = document.getElementById("controller-hero");
const controllerRotor = document.querySelector(".controller__rotor");
const heroVisual = document.querySelector(".hero__visual");
const canvas = document.getElementById("energy-grid");
const seatRange = document.getElementById("seat-range");
const seatValue = document.getElementById("seats-value");
const venueType = document.getElementById("venue-type");
const priorityType = document.getElementById("priority-type");
const briefPackage = document.getElementById("brief-package");
const briefSummary = document.getElementById("brief-summary");
const briefList = document.getElementById("brief-list");
const briefForm = document.getElementById("brief-form");
const briefChips = document.querySelectorAll(".brief-chip");
const priorityHint = document.getElementById("priority-hint");
const buildScene = document.getElementById("build-scene");
const buildSteps = document.querySelectorAll(".build-step");

const priorityDescriptions = {
  "Быстрый запуск": "Когда нужно как можно быстрее открыть работающую зону и не растягивать старт на месяцы.",
  "Атмосфера и дизайн": "Когда важны первое впечатление, свет, посадка, настроение и желание гостя вернуться ещё раз.",
  "Максимальная загрузка и масштаб": "Когда проект сразу должен выдерживать поток гостей, высокий спрос и дальнейшее расширение форматов.",
  "Премиальный вау-эффект": "Когда зона должна работать как сильный визуальный магнит и производить эффект уже с первых секунд."
};

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
  {
    threshold: 0.18,
  }
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
    const value = Math.round(target * eased);
    node.textContent = value;

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

  let packageName = "Старт";
  let summary = "Компактный запуск для теста спроса с минимально необходимой комплектацией.";
  const bullets = [
    `${seats} игровых места`,
    "базовая конфигурация оборудования",
    "быстрый запуск без сложного сценария монтажа",
  ];

  const needsScale =
    seats >= 7 ||
    priority === "Максимальная загрузка и масштаб" ||
    venue.includes("ТЦ") ||
    venue.includes("клуб");

  const needsAtmosphere =
    seats >= 4 ||
    priority === "Атмосфера и дизайн" ||
    priority === "Премиальный вау-эффект" ||
    venue.includes("Лаунж") ||
    venue.includes("Отель");

  if (needsScale) {
    packageName = "Флагман";
    summary = "Подходит для крупной зоны с расширением форматов, высокой нагрузкой и более серьёзной операционной логикой.";
    bullets[1] = "расширенная зона с масштабированием и сервисным регламентом";
    bullets[2] = "подготовка под высокий поток гостей и дополнительные форматы";
  } else if (needsAtmosphere) {
    packageName = "Лаунж";
    summary = "Оптимальный вариант для пространства, где важны визуальная атмосфера, комфорт и контроль игровых сессий.";
    bullets[1] = "дизайн-концепт, свет и кабель-менеджмент";
    bullets[2] = "подготовка под повторные визиты и удобную работу администратора";
  }

  if (extras.length) {
    bullets.push(`дополнительно: ${extras.join(", ")}`);
  }

  if (!extras.includes("PS Lounge") && packageName !== "Старт") {
    bullets.push("рекомендуем добавить PS Lounge для контроля сессий");
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
}

if (seatRange && seatValue) {
  seatValue.textContent = seatRange.value;
  seatRange.addEventListener("input", () => {
    seatValue.textContent = seatRange.value;
    renderBriefRecommendation();
  });
}

if (briefForm) {
  briefForm.addEventListener("input", renderBriefRecommendation);
  venueType?.addEventListener("change", renderBriefRecommendation);
  priorityType?.addEventListener("change", renderBriefRecommendation);
  renderBriefRecommendation();
}

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

if (priorityHint) {
  priorityHint.textContent =
    priorityDescriptions[priorityType?.value] ||
    'Когда нужно как можно быстрее открыть работающую зону и не растягивать старт на месяцы.';
}

if (buildScene && buildSteps.length) {
  let activeStep = 1;
  let buildTimer = null;

  function setBuildStep(step) {
    activeStep = step;
    buildScene.dataset.activeStep = String(step);
    buildSteps.forEach((card) => {
      card.classList.toggle("is-active", Number(card.dataset.step) === step);
    });
  }

  function queueBuildLoop() {
    window.clearInterval(buildTimer);
    buildTimer = window.setInterval(() => {
      activeStep = activeStep >= 6 ? 1 : activeStep + 1;
      setBuildStep(activeStep);
    }, 1800);
  }

  buildSteps.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const step = Number(card.dataset.step);
      setBuildStep(step);
      window.clearInterval(buildTimer);
    });

    card.addEventListener("mouseleave", () => {
      queueBuildLoop();
    });

    card.addEventListener("click", () => {
      const step = Number(card.dataset.step);
      setBuildStep(step);
      queueBuildLoop();
    });
  });

  setBuildStep(1);
  queueBuildLoop();
}
