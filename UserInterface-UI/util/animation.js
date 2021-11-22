export default function animate() {
  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate_();
        observer.unobserve(entry.target);
      }
    });
  }
  let observer = new IntersectionObserver(callback, {});
  const targets = document.querySelectorAll("[id='down-up']");
  targets.forEach((target) => {
    observer.observe(target);
    target.style.opacity = 0;
    target.animate_ = () => {
      target.classList.add("animate-down-up");
    };
  });
}
