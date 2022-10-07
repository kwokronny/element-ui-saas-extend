<template>
  <el-form-auto :data="form" v-model="model" label-width="130px">
    <div>{{ model }}</div>
  </el-form-auto>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      form: {
        subject: {
          label: "主体",
          type: "radio",
          required: true,
          options: { person: "个人", company: "企业" },
          value: "person",
        },
        person_name: {
          label: "姓名",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "person";
          },
        },
        person_number: {
          label: "身份证",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "person";
          },
        },
        company_name: {
          label: "企业名称",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "company";
          },
        },
        company_number: {
          label: "统一税务登记号",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "company";
          },
        },
      },
    };
  },
};
</script>