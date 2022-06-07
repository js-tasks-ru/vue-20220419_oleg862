<script>
import { isVNode } from 'vue';

export default {
  name: 'VNode',

  props: {
    vnode: {
      type: [Object, Array],
      require: true,
      validator: (vnodes) => (Array.isArray(vnodes) ? vnodes : [vnodes]).every((mustBeVNode) => isVNode(mustBeVNode)),
    },
  },

  render() {
    return this.vnode;
  },
};
</script>
