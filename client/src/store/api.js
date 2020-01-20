import Axios from "axios"

let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

export let api =

  Axios.create({
    baseURL: base + "api/",
    timeout: 3000,
    withCredentials: true
  });