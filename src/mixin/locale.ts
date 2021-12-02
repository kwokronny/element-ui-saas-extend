import { t } from "../locale";

export default {
  methods: {
    $t(path: string) {
      return t(path);
    },
  },
};
