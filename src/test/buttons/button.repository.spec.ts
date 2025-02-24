import { ButtonRepository } from "../../repositories/button.repository";
import { Button } from "../../entities/buttons.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../../config/database";

jest.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe("ButtonRepository", () => {
  let buttonRepository: ButtonRepository;
  let mockButtonRepo: jest.Mocked<Repository<Button>>;

  beforeEach(() => {
    // Mock the TypeORM repository
    mockButtonRepo = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Button>>;

    // Mock AppDataSource to return the mocked repository
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockButtonRepo);

    // Initialize ButtonRepository
    buttonRepository = new ButtonRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create and save a new button successfully", async () => {
    // Mock input data
    const requestData = { label: "Test Button", icon: "test-icon" };

    // Mock saved button data
    const savedButton: Button = {
      id: 1,
      label: "Test Button",
      icon: "test-icon",
      mappings: [],
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: 0,
    };

    // Mock repository behavior
    mockButtonRepo.create.mockReturnValue(savedButton);
    mockButtonRepo.save.mockResolvedValue(savedButton);

    // Call repository function
    const result = await buttonRepository.createNewButton(requestData);

    // Assertions
    expect(mockButtonRepo.create).toHaveBeenCalledWith(requestData);
    expect(mockButtonRepo.save).toHaveBeenCalledWith(savedButton);
    expect(result).toEqual(savedButton);
  });

  //   it("should throw an error if saving the button fails", async () => {
  //     // Mock input data
  //     const requestData = { label: "Test Button", icon: "test-icon" };

  //     // Mock repository behavior
  //     const errorMessage = "Database error";
  //     mockButtonRepo.create.mockReturnValue(requestData as Button);
  //     mockButtonRepo.save.mockRejectedValue(new Error(errorMessage));

  //     // Spy on console.error to prevent actual logs in test output
  //     jest.spyOn(console, "error").mockImplementation(() => {});

  //     // Call repository function and expect an error
  //     await expect(buttonRepository.createNewButton(requestData)).rejects.toThrow(errorMessage);

  //     // Assertions
  //     expect(mockButtonRepo.create).toHaveBeenCalledWith(requestData);
  //     expect(mockButtonRepo.save).toHaveBeenCalledWith(requestData);
  //     expect(console.error).toHaveBeenCalledWith(expect.any(Error));
  //   });

  it("should throw an error when save fails", async () => {
    // Mock input data
    const requestData = { label: "Test Button", icon: "test-icon" };

    // Mock repository behavior to throw an error
    const errorMessage = "Database save failed";
    mockButtonRepo.create.mockReturnValue(requestData as Button);
    mockButtonRepo.save.mockRejectedValue(new Error(errorMessage));

    // Call repository function and expect it to throw the error
    await expect(buttonRepository.createNewButton(requestData)).rejects.toThrow(
      errorMessage
    );

    // Assertions
    expect(mockButtonRepo.create).toHaveBeenCalledWith(requestData);
    expect(mockButtonRepo.save).toHaveBeenCalledWith(requestData);
  });
});
