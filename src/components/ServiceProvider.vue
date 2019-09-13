<template>
  <div class="home">
    <div class="serviceprovider">
      <h1>Service Provider</h1>
      <input
        v-model="businessName"
        placeholder="serviceProvider Name"
        class="input"
      >
      <button
        @click="addServiceProvider()"
        class="serviceButton"
      >Add ServiceProvider</button>
      <div
        class="center hideform"
        id="sp"
      >
        <button
          id="close"
          style="float: right;"
          @click="closeForm()"
        >X</button>
        <form>
          Enter BussinessName:
          <input
            type="text"
            name="firstname"
            v-model="name"
          ><br />
          <br />
          <input
            type="submit"
            value="Update"
            @click="update(name, id)"
          >
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody
          v-for="(sp,index) in ServiceProviders"
          :key="index"
        >
          <tr>
            <td>{{sp.businessName}}</td>
            <td><button
                @click="deleteSp(sp)"
                class="text button delete"
              >Delete</button></td>
            <td><button
                @click="display(sp)"
                class="serviceButton"
              >update ServiceProvider</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ServiceProvider from '../mutations/ServiceProvider'
import AllServiceProviders from '../queries/AllServiceProviders'
import DeleteSp from '../mutations/DeleteSp'
import UpdateSp from '../mutations/UpdateSp'
export default {
  name: 'SeviceProvider',
  data () {
    return {
      businessName: '',
      name: '',
      id: '',
      ServiceProviders: []
    }
  },
  apollo: {
    ServiceProviders: {
      query: () => AllServiceProviders,
      update: data => {
        return data.listServiceProviders.items
      }
    }
  },
  methods: {
    addServiceProvider () {
      const businessName = this.businessName
      if ((businessName) === '') {
        alert('please add service Provider')
        return
      }
      this.businessName = ''
      const serviceprovider = {
        businessName: businessName
      }
      this.$apollo.mutate({
        // eslint-disable-next-line no-undef
        mutation: ServiceProvider,
        variables: serviceprovider,
        update: (store, { data: { createServiceProvider } }) => {
          // eslint-disable-next-line no-undef
          const data = store.readQuery({ query: AllServiceProviders })
          data.listServiceProviders.items.push(createServiceProvider)
          // eslint-disable-next-line no-undef
          store.writeQuery({ query: AllServiceProviders, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createServiceProvider: {
            __typename: 'ServiceProvider',
            ...serviceprovider
          }
        }
      })
        .then(e => { window.location.reload() }, 600)
        .then(data => console.log(data))
        .catch(error => console.error('error!!!: ', error))
    },
    deleteSp (sp) {
      this.$apollo.mutate({
        mutation: DeleteSp,
        variables: {
          id: sp.id
        },
        update: (store, { data: { deleteSp } }) => {
          const data = store.readQuery({ query: AllServiceProviders })
          data.listServiceProviders.items = data.listServiceProviders.items.filter(sp => sp.id !== DeleteSp.id)
          store.writeQuery({ query: AllServiceProviders, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteSp: {
            __typename: 'ServiceProvider',
            ...sp
          }
        }
      })
        .then(e => { window.location.reload() }, 600)
        .then(data => console.log(data))
        .catch(error => console.error(error))
    },
    update (name, id) {
      if ((this.name) === '') {
        alert('please add Enter Name')
        return
      }
      const updatedsp = {
        id: id,
        businessName: name
      }
      this.$apollo.mutate({
        mutation: UpdateSp,
        variables: updatedsp,
        update: (store, { data: { updatesp } }) => {
          const data = store.readQuery({ query: AllServiceProviders })
          const index = data.listServiceProviders.items.findIndex(item => item.id === UpdateSp.id)
          data.listServiceProviders.items[index] = UpdateSp
          store.writeQuery({ query: AllServiceProviders, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          UpdateSp: {
            __typename: 'ServiceProvider',
            ...updatedsp
          }
        }
      })
        .then(data => console.log(data))
        .catch(error => console.error(error))
    },
    display (sp) {
      this.name = sp.businessName
      this.id = sp.id
      document.getElementById('sp').style.display = 'block'
    },
    closeForm () {
      document.getElementById('sp').style.display = 'none'
    }
  }
}
</script>
<style scoped>
.home {
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
table,
th,
td {
  padding: "10px 10px 10px 10px";
  margin-top: 30px;
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
}
.center {
  margin: auto;
  width: 60%;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.hideform {
  display: none;
}
</style>
