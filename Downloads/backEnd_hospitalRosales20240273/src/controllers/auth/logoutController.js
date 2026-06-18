const loginController = {};

loginController.logout = async (req, res) => {
  try {
    res.clearCookie("authCookie");
    return res.status(200).json({ message: "Session closed" });
  } catch (error) {}
};

export default loginController;
