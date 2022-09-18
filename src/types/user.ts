export interface UserInt {
  id: number,
  nikeName: string,
  userName: string,
  role: RoleInt[]
}

interface RoleInt {
  role: number,
  roleName: string,

}

interface SelectDataInt {
  nikeName: string,
  role: any,
  page: number,
  count: number
}

interface RoleListInt {
  roleName: string,
  roleId: number,
  suthorty: number[]
}

export class InitData {
  selectData: SelectDataInt = {
    nikeName: '',
    role: 0,
    page: 0,
    count: 0
  }
  list: UserInt[] = []
  souList: UserInt[] = []
  roleList: RoleListInt[] = []
}