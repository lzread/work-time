<template>
    <div class="container">

        <div class="filterBar">
            <el-button size="mini" type="primary" v-permission="'ADD'" @click="addRoleHandle">新建角色</el-button>
        </div>

        <div class="tableArea">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <el-table :data="roles" stripe>
                    <el-table-column prop="role_name" label="角色名称"> </el-table-column>
                    <el-table-column prop="role_desc" label="角色描述"> </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status == -1" size="mini">系统默认</el-tag>
                            <el-tag v-else-if="scope.row.status == 0" size="mini">正常</el-tag>
                            <el-tag v-else-if="scope.row.status == 1" size="mini" type="info">停用</el-tag>
                            <el-tag v-else size="mini">其他</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button @click="updateRoleHandle(scope.row)" v-if="scope.row.status != -1" type="text" size="mini" v-permission="'EDIT'">编辑角色</el-button>
                            <el-button @click="permissionHandle(scope.row)" v-if="scope.row.status != -1" size="mini" type="text" v-permission="'EDIT'">权限设置</el-button>
                            <el-button @click="userHandle(scope.row)" v-if="scope.row.status != -1" size="mini" type="text" v-permission="'EDIT'">管理用户</el-button>
                            <el-button @click="deleteRoleHandle(scope.$index, scope.row)" v-if="scope.row.status != -1" type="text" size="mini" v-permission="'DELETE'">删除角色</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>

            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getRoles" />
        </div>

        <el-dialog width="640px" :visible.sync="dialogVisiblePermission" title="权限设置">
            <permission-list :items="menus" @getSelected="getCheckedKeys" :setSelected="setCheckedKeys"></permission-list>

            <div slot="footer">
                <el-button size="mini" type="danger" @click="dialogVisiblePermission = false">取消</el-button>
                <el-button size="mini" type="primary" @click="addRoleMenu">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog width="400px" :visible.sync="dialogVisibleRole" :title="dialogVisibleRoleType == 'add' ? '新建角色' : '编辑角色'">
            <el-form ref="roleForm" :model="role" :rules="rules" label-width="80px" label-position="right" size="mini">
                <el-form-item label="角色名称" prop="role_name">
                    <el-input v-model="role.role_name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色代码" prop="role_code">
                    <el-input v-model="role.role_code" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="role.role_desc" :autosize="{ minRows: 5, maxRows: 10 }" type="textarea" placeholder="请输入角色描述" />
                </el-form-item>
                <el-form-item label="角色状态">
                    <el-radio-group v-model="role.status">
                        <el-radio :label="0">正常</el-radio>
                        <el-radio :label="1">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button size="mini" type="danger" @click="(dialogVisibleRole = false), resetForm('roleForm')">取消</el-button>
                <el-button size="mini" type="primary" @click="saveRole()">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog width="640px" :visible.sync="dialogVisibleUser" title="关联用户">
            <el-table :data="users" stripe>
                <el-table-column prop="username" label="用户名"> </el-table-column>
                <el-table-column prop="realname" label="真实姓名"> </el-table-column>

                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button v-if="isCurrent(scope.row)" @click="addUserRoleHandle(scope.row)" size="mini" type="primary">添加</el-button>

                        <el-button v-else @click="deleteUserRoleHandle(scope.row)" size="mini" type="danger">取消</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="userTotal > 0" :total="userTotal" :page.sync="userListQuery.page" :limit.sync="userListQuery.limit" @pagination="getUsers" />
        </el-dialog>
    </div>
</template>

<script>
import { getAllMenus } from "@/api/menu";
import {
    getRoles,
    getRoleNameExist,
    getRoleMenu,
    addRole,
    updateRole,
    deleteRole,
    addRoleMenuBatch,
} from "@/api/role";
import {
    getUsers,
    getUserByRoleId,
    addUserRole,
    deleteUserRole,
} from "@/api/user";
import { deepClone, arrayKey } from "@/utils";
import PermissionList from "../components/PermissionList";
import Pagination from "@/components/Pagination";
import permission from "@/directive/permission/index.js"; // 权限判断指令
export default {
    name: "roles",
    data() {
        return {
            menus: [],
            roles: [],
            users: [],
            role_id: "",
            role: {
                status: 0,
            },
            setCheckedKeys: [],
            checkedKeys: [],
            dialogVisibleRole: false,
            dialogVisibleRoleType: "",
            dialogVisibleUser: false,
            dialogVisiblePermission: false,
            rules: {
                role_name: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 15,
                        message: "长度在 2 到 15 个字符",
                        trigger: "blur",
                    },
                ],
                role_code: [
                    {
                        required: true,
                        message: "请输入角色代码",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 15,
                        message: "长度在 2 到 15 个字符",
                        trigger: "blur",
                    },
                ],
            },
            total: 0,
            listQuery: {
                page: 1,
                limit: 10,
            },
            userTotal: 0,
            userListQuery: {
                page: 1,
                limit: 10,
            },
        };
    },
    created() {
        this.getRoles();
        this.getAllMenus();
        this.getUsers();
    },
    filters: {},
    computed: {},
    methods: {
        async getAllMenus() {
            const { data } = await getAllMenus();
            this.menus = data;
        },
        async getRoles() {
            const { data, total } = await getRoles(this.listQuery);
            this.roles = data;
            this.total = total;
        },
        async addRoleMenu() {
            this.dialogVisiblePermission = false;
            let arr = [];
            this.checkedKeys.forEach((item) => {
                arr.push({
                    role_id: this.role_id,
                    menu_id: item,
                });
            });
            const { data } = await addRoleMenuBatch(this.role_id, arr);
        },
        addRoleHandle() {
            this.role = { status: 0 };
            this.dialogVisibleRoleType = "add";
            this.dialogVisibleRole = true;
        },
        updateRoleHandle(row) {
            this.dialogVisibleRoleType = "update";
            this.dialogVisibleRole = true;
            this.role = deepClone(row);
        },
        userHandle(row) {
            this.userListQuery.page = 1;
            this.getUsers();
            this.dialogVisibleUser = true;
            this.role_id = row.id;
        },
        async getUsers() {
            const { data, total } = await getUsers(this.userListQuery);
            this.users = data;
            this.userTotal = total;
        },
        async addUserRoleHandle(row) {
            const { data } = await addUserRole({
                user_id: row.id,
                role_id: this.role_id,
            });
            if (data) {
                let ids = row.role_ids ? row.role_ids.split(",") : [];
                ids.push(this.role_id);
                row.role_ids = ids.join(",");
            }
        },
        async deleteUserRoleHandle(row) {
            const { data } = await deleteUserRole({
                user_id: row.id,
                role_id: this.role_id,
            });

            if (data) {
                let ids = row.role_ids.split(",");
                ids.splice(arrayKey(ids, this.role_id), 1);
                row.role_ids = ids.join(",");
            }
        },
        deleteRoleHandle(index, row) {
            this.$confirm("是否删除当前角色?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                this.roles.splice(index, 1);
                await deleteRole(row.id);
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
            });
        },
        saveRole() {
            this.$refs["roleForm"].validate(async (valid) => {
                if (valid) {
                    if (this.dialogVisibleRoleType == "add") {
                        try {
                            await getRoleNameExist(this.role.role_code);
                            await addRole(this.role);
                        } catch (error) {
                            return;
                        }
                    } else {
                        await updateRole(this.role);
                    }
                    this.dialogVisibleRole = false;
                    this.getRoles();
                } else {
                    return false;
                }
            });
        },
        async permissionHandle(row) {
            const { id } = row;
            this.role_id = id;
            this.dialogVisiblePermission = true;
            this.setCheckedKeys = [];
            const { data } = await getRoleMenu(id);
            let keys = [];
            data.forEach((item) => {
                keys.push(item.menu_id);
            });
            this.setCheckedKeys = keys;
        },
        isCurrent(row) {
            if (row.role_ids) {
                let arr = row.role_ids.split(",");
                let role_id = this.role_id.toString();
                if (arr.includes(role_id)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        getCheckedKeys(data) {
            this.checkedKeys = data;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    directives: { permission },
    components: { PermissionList, Pagination },
};
</script>

<style lang="scss" scoped>
</style>
