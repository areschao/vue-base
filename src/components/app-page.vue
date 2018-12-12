<template>
  <el-pagination
    background
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next"
    :total="total" class="fenye">
  </el-pagination>
</template>

<script>
    export default {
        data(){
          return{
            pageSizes: [10,20,30,40],
            pageSize:10,
            currentPage: 1,
          }
        },
      props:{
        total: Number,
      },
      methods:{
        sizeChange(val) {
          this.currentPage = 1
          this.pageSize = val
          this.$emit("reloadData",this.currentPage,val)
        },
        currentChange(val) {
          this.currentPage = val
          this.$emit("reloadData",val,this.pageSize)
        }
      }
    }
</script>

<style scoped>
  .fenye {
    margin: 20px;
    float: right;
    margin-right: 20px;
  }
</style>
