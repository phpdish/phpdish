<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Checker;

use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;

class DirectoryChecker extends IOAwareChecker
{
    /**
     * @var Filesystem
     */
    protected $filesystem;

    /**
     * @var OutputInterface
     */
    protected $output;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $directory;

    public function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    /**
     * {@inheritdoc}
     */
    public function check()
    {
        $this->ensureExists($this->directory);
        $this->ensureIsWritable($this->directory);

        return true;
    }

    /**
     * 检查目录是否可写.
     *
     * @param string $directory
     */
    public function ensureIsWritable($directory)
    {
        if (is_writable($directory)) {
            return;
        }
        try {
            $this->filesystem->chmod($directory, 0755);
            $this->output->writeln(sprintf('<comment>Changed "%s" permissions to 0755.</comment>', realpath($directory)));
        } catch (IOException $exception) {
            $this->output->writeln('');
            $this->output->writeln('<error>Cannot run command due to bad directory permissions (tried to change permissions to 0755).</error>');
            $this->output->writeln('');
            throw new \RuntimeException(sprintf(
                'Set "%s" writable and run command "<comment>%s</comment>"',
                realpath(dirname($directory)),
                $this->name
            ));
        }
    }

    /**
     * 检查目录是否存在.
     *
     * @param string $directory
     */
    public function ensureExists($directory)
    {
        if (is_dir($directory)) {
            return;
        }

        try {
            $this->filesystem->mkdir($directory, 0755);

            $this->output->writeln(sprintf('<comment>Created "%s" directory.</comment>', realpath($directory)));
        } catch (IOException $exception) {
            $this->output->writeln('');
            $this->output->writeln('<error>Cannot run command due to unexisting directory (tried to create it automatically, failed).</error>');
            $this->output->writeln('');

            throw new \RuntimeException(sprintf(
                'Create directory "%s" and run command "<comment>%s</comment>"',
                realpath($directory),
                $this->name
            ));
        }
    }

    /**
     * 设置目录.
     *
     * @param string $directory
     */
    public function setDirectory($directory)
    {
        $this->directory = $directory;
    }

    /**
     * 设置命令.
     *
     * @param string $name
     */
    public function setCommandName($name)
    {
        $this->name = $name;
    }
}
