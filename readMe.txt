Unprivileged containers are the safest containers. Those use a map of uid and gid to allocate a range of uids and gids to a container. That means that uid 0 (root) in the container is actually something like uid 100000 outside the container. So should something go very wrong and an attacker manages to escape the container, they'll find themselves with about as many rights as a nobody user.

Unfortunately this also means that the following common operations aren't allowed:

    mounting of most filesystems
    creating device nodes
    any operation against a uid/gid outside of the mapped set

Because of that, most distribution templates simply won't work with those. Instead you should use the "download" template which will provide you with pre-built images of the distributions that are known to work in such an environment.

Now, everything below assumes a recent Ubuntu system or another Linux distribution which offers a similar experience (recent kernel, recent version of shadow, cgmanager and default uid/gid allocation).

First of all, you need to make sure your user has a uid and gid map defined in /etc/subuid and /etc/subgid. On Ubuntu systems, a default allocation of 65536 uids and gids is given to every new user on the system, so you should already have one. If not, you'll have to use usermod to give yourself one.

Next up is /etc/lxc/lxc-usernet which is used to set network devices quota for unprivileged users. By default, your user isn't allowed to create any network device on the host, to change that, add: