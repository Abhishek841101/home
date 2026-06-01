import { useParams } from "react-router-dom";
import ServicePageLayout from "../components/ServicePageLayout";

export default function ServiceDynamic() {
  const { name } = useParams();

  // URL slug ko readable title me convert karega
  const title = name
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return <ServicePageLayout title={title} />;
}