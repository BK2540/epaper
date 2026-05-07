import CustomButton from "@/components/CustomButton";
import Input from "@/components/Input";

const Home = () => {
  return (
    <div>
      Home
      <CustomButton title="Test" onClick={() => {}} size="small" />
      <Input variant="expiry" label="expiry" />
    </div>
  );
};

export default Home;
