import Vue from 'vue';

export const vueDirectives = {
    import(){
        Vue.directive('delay-click', {
            inserted(el, binding) {
              el.addEventListener('click', () => { setTimeout(() => { binding.value() }, 300) });
            }
          });
          
          Vue.directive('touch-start', {
            inserted(el, binding) {
              el.addEventListener('touchstart', () => { binding.value(event) }, false);
            }
          });
          
          Vue.directive('touch-move', {
            inserted(el, binding) {
              el.addEventListener('touchmove', () => { binding.value(event) }, false);
            }
          });
          
          Vue.directive('touch-end', {
            inserted(el, binding) {
              el.addEventListener('touchend', () => { binding.value(event) }, false);
            }
          });
    }
}