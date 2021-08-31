import NavbarAloglia1 from "../components/ui/NavbarAloglia1";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import Sale1Comp from "../components/ui/Sale1Comp";
import { useState, useEffect } from "react";

import { Sale10Endpoint, authEndpoint } from "./Property.js";
import { clientid, clientsecret, algoliaindex,searchClient } from "./Cred";

export async function getServerSideProps() {
  const auth_res = await fetch(authEndpoint, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientid + ":" + clientsecret).toString("base64"),
    },
  });

  let res_auth = await auth_res.json();

  const clientToken = res_auth.access_token;
  const res = await fetch(Sale10Endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientToken,
    },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

function SaleTenPercent({ data }) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={algoliaindex}>
        <NavbarAloglia1 />

        <Sale1Comp value={results} />
      </InstantSearch>
    </div>
  );
}

export default SaleTenPercent;
