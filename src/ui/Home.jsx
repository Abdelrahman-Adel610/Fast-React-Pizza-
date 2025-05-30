import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="text-center">
      <h1 className="mb-8 text-2xl font-bold text-stone-700">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
