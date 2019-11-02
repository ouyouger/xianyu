<template>
  <div class="search_form">
    <div class="search_title">
      <div
        class="title_item"
        v-for="(item,index) in ['单程','往返']"
        :key="index"
        :class="currentIndex===index?'active':''"
      >{{item}}</div>
    </div>
    <div class="search_content">
      <el-form label-width="80px">
        <el-form-item label="出发城市">
          <el-autocomplete
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect1"
            v-model="form.departCity"
          ></el-autocomplete>
        </el-form-item>
        <!-- 换 -->
        <div class="city_change" @click="handleCityChange">换</div>
        <!-- 换 -->
        <el-form-item label="到达城市">
          <el-autocomplete
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect2"
            v-model="form.destCity"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            v-model="form.departDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="handleGetTicket">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      form: {
        //  出发城市
        departCity: "广州",
        // 出发城市 编码
        departCode: "CAN",
        // 到达城市
        destCity: "上海",
        // 到达城市 编码
        destCode: "SHA",
        // 出发时间
        departDate: "2019-11-28"
      }
    };
  },
  methods: {
    querySearchAsync(queryString, callback) {
      if (queryString) {
        this.$axios
          .get("/airs/city", { params: { name: queryString } })
          .then(res => {
            console.log(res);
            let cityArr = res.data.data;
            cityArr.forEach(v => {
              //把 广州市 “市”去掉
              v.name=v.name.replace('市','')
              v.value = v.name;
            });
            callback(cityArr);
          });
      }
    },
    //点击 出发城市
    handleSelect1(item) {
        //给编码赋值，sort是一个编码
      this.form.departCode = item.sort; 
      console.log(item);
    },
    //点击 到达城市
    handleSelect2(item) {
      this.form.destCode = item.sort;
    },
    //交换城市编码
    handleCityChange() {
      [
        this.form.departCity,
        this.form.departCode,
        this.form.destCity,
        this.form.destCode
      ] = [
        this.form.destCity,
        this.form.destCode,
        this.form.departCity,
        this.form.departCode
      ];
    },
    //点击搜索
    handleGetTicket(){
      let cityStr=localStorage.getItem('city');
      let arr=[];
      if(cityStr){
        arr=JSON.parse(cityStr)
      }
      //去重
      const index=arr.findIndex(
        v=>JSON.stringify(this.form)===JSON.stringify(v)
      );
      if(index!==-1){
        arr.splice(index,1)
      }
      arr.unshift(this.form)
      localStorage.setItem('city',JSON.stringify(arr))
        this.$router.push({path:'/air/flights',query:this.form})
    }
  }
};
</script>

<style lang="less" scoped>
.search_form {
}

.search_title {
  height: 50px;
  background-color: #fff;
  display: flex;
  .title_item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
  }
  .active {
    background-color: #fff;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      top: 0;
      left: 0;
      background-color: orange;
    }
  }
}
.search_content {
  padding: 20px 50px 20px 25px;
  position: relative;
  .city_change {
    position: absolute;
    background-color: #666;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 13px;
    right: 11px;
    top: 59px;
    cursor: pointer;
    &::before {
      content: "";
      width: 30px;
      height: 19px;
      border: 1px solid #ccc;
      border-left: none;
      border-bottom: none;
      position: absolute;
      top: -20px;
      left: -20px;
    }
    &::after {
      content: "";
      width: 30px;
      height: 19px;
      border: 1px solid #ccc;
      border-left: none;
      border-top: none;
      position: absolute;
      bottom: -20px;
      left: -20px;
    }
  }
}
.history {
  border: 1px solid #ccc;
  padding: 20px;
  .history_title {
    font-size: 26px;
    padding: 20px 0;
  }

  .history_content {
    .history_row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .his_left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: left;
        p:nth-child(1) {
          font-size: 18px;
        }
        p:nth-child(2) {
          color: #666;
          font-size: 13px;
        }

      }

      .his_right {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>