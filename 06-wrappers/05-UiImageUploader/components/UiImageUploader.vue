<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': uploading }"
      :style="`--bg-url: url(${image})`"
    >
      <span class="image-uploader__text">{{ uploaderText }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @click="onFileClick"
        @change="onFileChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'remove', 'upload', 'error'],

  data() {
    return {
      image: undefined,
      uploading: false,
    };
  },

  computed: {
    state() {
      return !this.image ? 'empty' : this.uploading ? 'uploading' : 'success';
    },
    uploaderText() {
      const stateTexts = {
        empty: 'Загрузить изображение',
        uploading: 'Загрузка...',
        success: 'Удалить изображение',
      };
      return stateTexts[this.state];
    },
  },

  created() {
    this.image = this.preview;
  },

  methods: {
    async onFileChange(e) {
      const file = e.target.files[0];
      this.image = URL.createObjectURL(file);
      this.$emit('select', file);
      if (this.uploader) {
        this.uploading = true;
        try {
          const result = await this.uploader(file);
          this.$emit('upload', result);
        } catch (e) {
          this.$emit('error', e);
          this.clean();
        } finally {
          this.uploading = false;
        }
      }
    },

    onFileClick(e) {
      if (this.uploading || this.image) {
        e.stopPropagation();
        e.preventDefault();
      }

      if (!this.uploading && this.image) {
        this.$emit('remove', this.image);
        this.clean();
      }
    },

    clean() {
      this.image = undefined;
      this.$refs.input.value = null;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
