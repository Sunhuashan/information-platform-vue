<template>
<div>
  <el-form>
    <el-form-item>
      <el-button type="primary" v-on:click="function1">menu</el-button>
    </el-form-item>
    <el-form-item label="角色分配" label-width="120px" prop="allRoles">
          <el-checkbox-group  v-model="selectedRolesIds">
              <el-checkbox v-for="(role,i) in allRoles" :key="i" :label="role.id">{{role.roleNameZh}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
  </el-form>
  <el-checkbox-group v-model="selectedRoleIds">
     <el-checkbox v-for="(role,i) in allRoles" :key="i" :label="role.id">{{role.roleNameZh}}</el-checkbox>
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group>
</div>
</template>
<script>
export default {
  data () {
    return {
      checkList: ['选中且禁用', '复选框 1'],
      a: 'eeeeee',
      users: [],
      editDialogVisisble: false,
      SelectedManager: [],
      allRoles: [
        {
          id: 1,
          roleNameZh: 'q'
        },
        {
          id: 2,
          roleNameZh: 'w'
        }
      ],
      selectedRoleIds: ['1']
    }
  },
  mounted () {
    // this.selectRoles()
  },
  computed: {
    testNum () {
      return this.$store.state.username
    },
    all () {
      return this.$store.state
    }
  },
  methods: {
    function1 () {
      this.$axios
        .post('/admin/manager_menu', {
          managerUsername: this.testNum
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.a = resp.data.data
          }
        }

        )
    },
    selectRoles () {
      var _this = this
      _this.$axios
        .get('/admin/roles')
        .then(result => {
          if (result.data.code === 200) {
            _this.allRoles = result.data.data
          }
        })
    }
  }
}
</script>
