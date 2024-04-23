import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "./ExpenseForm";

describe("ExpenseForm Component", () => {
  let wrapper;
  const prop = {
    change: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<ExpenseForm {...prop} />);
  });

  it("renders", () => {
    expect(wrapper).not.toBeNull();
  });

  it("should update the amount", () => {
    const amount = wrapper.find("#amount");
    amount.simulate("change", { target: { name: "amount", value: "50" } });
    expect(wrapper.find("#amount").props().value).toEqual("50");
  });

  it("should update the category value", () => {
    const categoryValue = wrapper.find("#category-0");
    categoryValue.simulate("change", { target: { name: "value", value: "25" } });
    expect(wrapper.find("#category-0").props().value).toEqual("25");
  });

  it("should call change", () => {
    wrapper.find("button").simulate("click");
    expect(prop.change).toHaveBeenCalledTimes(1);
  });
});