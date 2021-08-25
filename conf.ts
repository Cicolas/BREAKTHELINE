import { Config } from "love";

love.conf = (t: Config) => {
    t.window.width = 595;
    t.window.height = 595;
    t.window.resizable = true;
    t.window.msaa = 0;
    t.window.title = "BREAKTHELINE"
}