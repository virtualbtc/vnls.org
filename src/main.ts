import { DomNode } from "@hanul/skynode";
import SaleList from "./SaleList";

const exchange = new DomNode(document.getElementById("exchange")!);
exchange.append(new SaleList());
