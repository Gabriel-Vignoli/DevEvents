const UserDetails = async ({ params,}: { params: Promise<{ id: string }>}) => {
  const { id } = await params;

  return (
    <>
      <p>User ID: {id}</p>
    </>
  );
};

export default UserDetails;
