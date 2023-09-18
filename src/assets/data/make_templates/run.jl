using Pkg
if isfile("Project.toml") && isfile("Manifest.toml")
    Pkg.activate(".")
end

using JSON

path = abspath(pwd())
println(typeof(path))

# path to my prefilled data files
data_dir = joinpath(path, "..", "me")

# path to template file
templ_dir = joinpath(path, "..", "templates")

print(data_dir)

# delete all current templates
for file in readdir(templ_dir, join=true)
    rm(file)
end

replace(::String) = ""
replace(::Number) = 0
replace(::Bool) = true
replace(::Nothing) = nothing
replace(arr::AbstractArray) = [replace(x) for x in arr]
replace(dict::AbstractDict) = Dict([key => replace(val) for (key, val) in dict]...)

# go through every json data file and create empty template from it
for file in readdir(data_dir, join=true)
    if isfile(file) && endswith(file, ".json")
        # read json file
        json = JSON.parsefile(file)

        json = replace(json)

        # get name of file
        name = split(file, "/")[end]

        # write template file
        open(joinpath(templ_dir, name), "w") do f
            JSON.print(f, json, 4)
        end
    end
end
