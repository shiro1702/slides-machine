import { niches, styles } from "@/lib/meta";

export function startReplyMarkup() {
  return {
    inline_keyboard: [
      [{ text: "Сделать карусель", callback_data: "new_carousel" }],
      [
        { text: "Примеры", callback_data: "examples" },
        { text: "Как это работает", callback_data: "how_it_works" },
      ],
    ],
  };
}

export function nicheReplyMarkup() {
  return {
    inline_keyboard: niches.map((niche) => [
      { text: niche.label, callback_data: `n:${niche.id}` },
    ]),
  };
}

export function styleReplyMarkup() {
  return {
    inline_keyboard: [
      ...styles.map((style) => [
        { text: style.label, callback_data: `s:${style.id}` },
      ]),
      [{ text: "Отмена", callback_data: "cancel" }],
    ],
  };
}

export function confirmReplyMarkup() {
  return {
    inline_keyboard: [
      [{ text: "Сгенерировать", callback_data: "confirm" }],
      [{ text: "Отмена", callback_data: "cancel" }],
    ],
  };
}

export function errorReplyMarkup() {
  return {
    inline_keyboard: [
      [{ text: "Повторить", callback_data: "retry" }],
      [{ text: "Новый проект", callback_data: "new_carousel" }],
    ],
  };
}

export function doneReplyMarkup() {
  return {
    inline_keyboard: [
      [{ text: "Новый проект", callback_data: "new_carousel" }],
    ],
  };
}
