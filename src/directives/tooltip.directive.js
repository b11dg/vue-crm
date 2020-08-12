/* eslint-disable no-undef */
import localizeFilter from '@/filters/localize.filter';

export default {
    bind(el, { value }) {
        const localizeValue = localizeFilter(value);
        M.Tooltip.init(
            el,
            { html: localizeValue.includes('[Localize error]: key') ? value : localizeValue },
        );
    },
    unbind(el) {
        const tooltip = M.Tooltip.getInstance(el);

        if (tooltip && tooltip.destroy) {
            tooltip.destroy();
        }
    },
};
