import { message, danger, warn } from "danger";

// Add a CHANGELOG entry for app changes
const hasChangelog = danger.git.modified_files.includes("CHANGELOG.md");
const isTrivial = (danger.github.pr.body + danger.github.pr.title).includes(
    "#trivial",
);
if (!hasChangelog && !isTrivial) {
    warn("Please add a changelog entry for your changes.");
}

// Warn if there are library changes, but not tests
const hasSrcChanges =
    danger.git.modified_files.filter((filepath) => filepath.includes("src"))
        .length > 0;
const hasTestChanges =
    danger.git.modified_files.filter((filepath) => filepath.includes("tests"))
        .length > 0;
if (hasSrcChanges && !hasTestChanges) {
    warn(
        "There are code changes, but no tests changed or added. That's okay as long as you're refactoring existing code",
    );
}
