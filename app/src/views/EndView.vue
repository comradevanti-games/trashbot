<template>
  <div class="fill-parent">
    <toast-msg
      id="locationError"
      msg="Wir konnten keinen Standort finden! Überprüfe deine Standorteinstellungen."
      bgColor="danger"
    />
    <div class="column">
      <h1>Ranking</h1>
      <div class="rectPlayers box">
        <table class="table">
          <tbody>
            <tr v-for="(player, idx) in robots" :key="idx">
              <th scope="row">{{ idx + 1 }}.</th>
              <td>{{ player.name }}</td>
              <td>{{ getCoolness(idx) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { gameStore } from "../stores/index.ts";

export default {
  name: "EndView",
  data() {
    return {
      robots: [
        {
          id: null,
          location: {
            lat: 0,
            lng: 0,
          },
          name: "",
          robot: {
            arms: {
              coolness: null,
              range: null,
            },
            body: {
              coolness: null,
              range: null,
            },
            head: {
              coolness: null,
              range: null,
            },
            legs: {
              coolness: null,
              range: null,
            },
          },
        },
      ],
    };
  },

  created() {
    document.addEventListener("beforeunload", this.deleteStorage);

    this.$socket.emit("game/robots", {
      roomId: this.roomId,
    });
  },

  computed: {
    ...mapState(gameStore, {
      roomId: "roomId",
    }),
  },

  sockets: {
    "game/robots": function (data) {
      this.robots = data;
    },
  },

  methods: {
    deleteStorage() {
      localStorage.clear();
    },

    newGame() {
      this.$router.push("/");
    },

    getCoolness(idx) {
      const robot = this.robots[idx];
      return (
        Math.round(robot.robot.head.coolness) +
        Math.round(robot.robot.body.coolness) +
        Math.round(robot.robot.arms.coolness) +
        Math.round(robot.robot.legs.coolness)
      );
    },
  },
};
</script>

<style scoped>
.rectPlayers {
  padding: var(--dim-regular);
  flex-grow: 1;
  overflow: scroll;
}

.startBtn {
  margin-top: var(--dim-regular);
  width: 100%;
}
</style>
