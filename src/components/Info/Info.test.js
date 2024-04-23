import React from "react";
import { shallow } from "enzyme";
import Info from "./Info";

describe("Info Component", () => {
  let wrapper;
  const props = {
    amount: "50",
    category: "Food",
    id: "2b926f1b-db1f-45ac-af87-2130da1e1a2f",
    date: "10/25/2019",
    deleteCard: jest.fn()
  };
  beforeEach(() => {
    wrapper = shallow(<Info {...props} />);
  });

  it("renders", () => {
    expect(wrapper).not.toBeNull();
  });

  it("renders with props", () => {
    expect(wrapper.find("[data-test='amount']").text()).toEqual("Amount: $50");

    expect(wrapper.find("[data-test='category']").text()).toEqual(
      "Category: Food"
    );

    expect(wrapper.find("[data-test='date']").text()).toEqual(
      "Date: 10/25/2019"
    );
  });

  it("should delete the card", () => {
    wrapper.find("button").simulate("click");

    expect(props.deleteCard).toHaveBeenCalledTimes(1);
  });
})