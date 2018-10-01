# Simple Private Block Chain WebService

This is a very simple private block chain webservice implemented by Node.js/Express.
In this application you can do the following actions:

<ul>
<li>Add new Block to the chain</li>
<li>Get a block info</li>
<li>Validate a block</li>
<li>Validate the chain</li>
</ul>

## Structure

This app includes an API service and also a front App application implemented by react.

## Installation

To install the application clone the repo and then run `npm run install-deps`. It installs all necessary dependencies for both API service and front-end service.<br/>
If you only want to use the API service then run `npm install` and it installs all the required dependencies for API service.

## Run The application

You can run the application by `npm run dev`. It starts both the API service and front-end App. Then you can visit the front-App on the localhost:3000<br/>
If you want to use the API service, it's runing on localhost:8000. To learn more about the endpoints read the next section.<br/>
You can only start the API service by running `npm run server`.

## End Points

<table>
<thead><tr><th>Path</th><th>Method</th><th>Description</th><th>Request Example</th><th>Response Example </th><th>Errors</th></tr></thead>
<tbody>
<tr>
<td>/block/:height</td>
<td>GET</td>
<td>Get the information of the block at height</td>
<td>/block/3</td>
<td>
{
    "data": "this the third block",
    "height": 3,
    "time": "1537489203",
    "hash": "4d90833b9e8573fb96751543fe868ccd4d2f2d6ebe8f33f0203be2a267ea069d",
    "previousBlockHash": "5a02df0bfcd2f563fbabcbe4653fe8a362d29203d33abdcbdc20e96a5aa81765"
}
</td>
<td>
<ul>
<li>It returns 400 if the block number is greater that chain height with a proper message</li>
</ul>
</td>
</tr>
<tr>
  <td>/block</td>
  <td>POST</td>
  <td>Adds a new block to the chain</td>
  <td>{"body":"Hello chain"}
  </td>
  <td>
  {
      "data": "tHello Chain",
      "height": 10,
      "time": "1537489203",
      "hash": "4d90833b9e8573fb96751543fe868ccd4d2f2d6ebe8f33f0203be2a267ea069d",
      "previousBlockHash": "5a02df0bfcd2f563fbabcbe4653fe8a362d29203d33abdcbdc20e96a5aa81765"
  }
  </td>
  <td>
    <ul>
      <li>It returns 400 if the body is empty  with a proper message</li>
    </ul>
  </td>
</tr>
<tr>
  <td>/validate-a-block/:height</td>
  <td>GET</td>
  <td>Checks a block validation</td>
  <td>/validate-a-block/5
  </td>
  <td>
  {
      "valid":"true"
  }
  </td>
  <td>
    <ul>
      <li>It returns 400 if the block number is greater that chain height with a proper message</li>
    </ul>
  </td>
</tr>
<tr>
  <td>/validate-the-chain</td>
  <td>GET</td>
  <td>Validates the whole chain and it returns a list of invalid blocks</td>
  <td>/validate-the-chain/
  </td>
  <td>
    {
        "inavlids": null
    }
  </td>
  <td>
  </td>
</tr>
</tbody>

<br>
</table>

---

<b>NOTE! This project is not production ready and is only for porpuse of learning 👨🏻‍🎓</b>

❤️
