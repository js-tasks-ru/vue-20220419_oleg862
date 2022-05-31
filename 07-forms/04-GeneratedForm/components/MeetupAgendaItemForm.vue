<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove', internalValue.id)">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown v-model="internalValue.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input v-model="internalValue.startsAt" type="time" placeholder="00:00" name="startsAt" />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input v-model="internalValue.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group v-for="field in extraFields" :key="field.props.name" :label="field.label">
      <component
        :is="field.component"
        :name="field.props.name"
        :model-value="internalValue[field.props.name]"
        v-bind="field.props"
        @update:model-value="internalValue[field.props.name] = $event"
      ></component>
    </ui-form-group>

  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';
import moment from 'moment';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

/**
 * @typedef FormItemSchema
 * @property {string} label
 * @property {string|object} component
 * @property {object} props
 */
/** @typedef {string} AgendaItemField */
/** @typedef {string} AgendaItemType */
/** @typedef {Object.<AgendaItemType, FormItemSchema>} FormSchema */

/** @type FormSchema */
const commonAgendaItemFormSchema = {
  title: {
    label: 'Нестандартный текст (необязательно)',
    component: 'ui-input',
    props: {
      name: 'title',
    },
  },
};

/** @type {Object.<AgendaItemField, FormSchema>} */
const agendaItemFormSchemas = {
  registration: commonAgendaItemFormSchema,
  opening: commonAgendaItemFormSchema,
  talk: {
    title: {
      label: 'Тема',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    speaker: {
      label: 'Докладчик',
      component: 'ui-input',
      props: {
        name: 'speaker',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
    language: {
      label: 'Язык',
      component: 'ui-dropdown',
      props: {
        options: talkLanguageOptions,
        title: 'Язык',
        name: 'language',
      },
    },
  },
  break: commonAgendaItemFormSchema,
  coffee: commonAgendaItemFormSchema,
  closing: commonAgendaItemFormSchema,
  afterparty: commonAgendaItemFormSchema,
  other: {
    title: {
      label: 'Заголовок',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
  },
};

export default {
  name: 'MeetupAgendaItemForm',

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  agendaItemTypeOptions,
  agendaItemFormSchemas,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      internalValue: { ...this.agendaItem },
    };
  },

  computed: {
    extraFields() {
      return agendaItemFormSchemas[this.internalValue.type];
    },
  },

  watch: {
    internalValue: {
      deep: true,
      handler(value) {
        this.$emit('update:agendaItem', { ...value });
      },
    },

    'internalValue.startsAt'(newValue, oldValue) {
      const format = 'HH:mm';
      const startsAtMoment = moment(oldValue, format);
      const endsAtMoment = moment(this.internalValue.endsAt, format);
      const newEndsAtMoment = moment(newValue, format).add(endsAtMoment.diff(startsAtMoment), 'ms');
      this.internalValue.endsAt = newEndsAtMoment.format(format);
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
