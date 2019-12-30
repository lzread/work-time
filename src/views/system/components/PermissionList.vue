<template>
  <div class="box">

    <ul
      v-for="(item,index) in items"
      :key="index"
    >
      <li>
        <div
          class="showbox"
          :type="item.type"
          :parent="item.parent_id"
        >
          <label>
            <input
              type="checkbox"
              :value="item.id"
              :id="'element' + item.id"
              @change="getCheckboxCheckedKeys"
              name="cell"
            >

            <span>{{item.title}}</span>
          </label>

        </div>
        <perm-list
          v-if="item.children"
          :items="item.children"
          @getSelected="getCheckedKeys"
          :setSelected="setCheckedKeys"
        ></perm-list>
      </li>
    </ul>

  </div>
</template>



<script>
import { deepClone } from "@/utils";

export default {
  name: "PermList",
  data() {
    return {
      setCheckedKeys: []
    };
  },
  props: ["items", "setSelected"],
  created() {},
  methods: {
    getCheckedKeys(val) {
      this.$emit("getSelected", val);
    },
    getCheckboxCheckedKeys() {
      let arr = [];
      document.getElementsByName("cell").forEach(item => {
        if (item.checked) {
          arr.push(item.value);
        }
      });
      this.$emit("getSelected", arr);
    }
  },
  watch: {
    setSelected: {
      handler: function(val) {
        if (typeof val == "object") {
          let data = deepClone(val);
          let arr = [];
          if (data.length == 0) {
            setTimeout(() => {
              document.getElementsByName("cell").forEach(item => {
                item.checked = false;
              });
            }, 100);
          } else {
            data.forEach(item => {
              setTimeout(() => {
                document.getElementById("element" + item).checked = true;
              }, 100);
            });
          }
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  display: flex;
}
li {
  display: flex;
  flex-grow: 1;
}
.box {
  flex-grow: 0;
  flex-basis: 0;
}
.showbox {
  flex-basis: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  margin: 5px;
  flex-grow: 0;

  &[type="0"] {
    background: #fff;
    border: 1px solid #ccc;
  }
  &[type="1"] {
    background: #fff;
    border: 1px dashed #ccc;
  }
  &[parent="0"] {
    &::before {
      display: none;
    }
  }
  &::before {
    content: "";
    width: 10px;
    height: 1px;
    position: absolute;
    top: 50%;
    left: -11px;
    background: #ccc;
  }
  label {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    input {
      -webkit-appearance: none;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      margin: 0;
      padding: 0;
      &:checked {
        background: #ddd;
        & + span {
          color: #333;
        }
      }
      &:focus {
        outline: 0;
      }
    }
    span {
      position: relative;
      z-index: 1;
      padding: 5px;
      color: #666;
    }
  }
  &:hover {
    border-color: #ddd;
  }
}
</style>

