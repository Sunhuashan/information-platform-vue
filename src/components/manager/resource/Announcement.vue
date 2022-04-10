<template>
  <div>
    <el-card>
      <el-table :data="annos">
        <el-table-column label="公告内容" prop="annoContent" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="公告发布日期" prop="annoDate" align="center"></el-table-column>
        <el-table-column label="公告状态" prop="annoState" align="center" :formatter="fomatBoolean"></el-table-column>
        <el-table-column label="操作" prop="annoDate" align="center">
          <template slot-scope="scope">
            <el-button
             :disabled="scope.row.annoState"
              round
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="setSelectedAnno">
              修改
            </el-button>
            <el-button
              @click="preConfirm(scope.row)"
              type="danger"
              round
              icon="el-icon-delete"
              size="mini">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="19">
        <div>
          <el-pagination
            style="margin: 20px;text-align: center"
            background
            @current-change="currentChange"
            :page-size="pageSize"
            :current-page="currentPage"
            layout="total, prev, pager, next , jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="4" >
        <div style="margin: 19px;">
            <el-button
            type="primary"
            size="medium"
            round
            @click="editAnno">
            发布公告<i class="el-icon-edit-outline el-icon--right"></i></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  name: 'Announcement',
  data () {
    return {
      annos: [],
      currentPage: 1,
      pageSize: 5,
      total: 1
    }
  },
  mounted () {
    this.findAllAnno()
  },
  methods: {
    findAllAnno () {
      this.$axios
        .post('/admin/findAllAnno', {
          managerUsername: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.annos = result.data.data
            this.total = result.data.data.lenght
          }
        })
    },
    fomatBoolean (row, column, cellValue, index) {
      let state = ''
      if (cellValue === true) {
        state = '待审核'
      } else {
        state = '已发布'
      }
      return state
    },
    editAnno () {

    },
    flash () {
      this.reload()
    },
    currentChange (page) {
      this.currentPage = page
    }
  }
}
</script>
